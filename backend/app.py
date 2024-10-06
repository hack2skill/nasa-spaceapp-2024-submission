import os
import numpy as np
import matplotlib
matplotlib.use('Agg')
from flask import Flask, request, jsonify, send_file, send_from_directory
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
import matplotlib.pyplot as plt
from scipy.signal import spectrogram, butter, filtfilt
import firebase_admin
from firebase_admin import credentials, storage
from datetime import datetime, timedelta
from io import BytesIO

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

UPLOAD_FOLDER = 'uploads/'
PROCESSED_FOLDER = 'processed_data/'
ALLOWED_EXTENSIONS = {'csv'}
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(PROCESSED_FOLDER, exist_ok=True)

cred = credentials.Certificate('./seismotrack-aa80c-firebase-adminsdk-cw0zv-13c8fa7db2.json')
firebase_admin.initialize_app(cred, {
    'storageBucket': 'seismotrack-aa80c.appspot.com'
})

bucket = storage.bucket()

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(PROCESSED_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/api/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and allowed_file(file.filename):
        try:
            file_path = os.path.join(UPLOAD_FOLDER, file.filename)
            file.save(file_path)

            # Process the file with AI model and filter noise
            filtered_data, spectrogram_path = process_csv(file_path)

            # Generate the filename for Firebase
            time_abs = datetime.now().strftime('%Y-%m-%dT%H:%M:%S.%f')  # Current time in the specified format
            filtered_file_name = f"filtered_data_{time_abs}.csv"
            upload_to_firebase('./processed_data/filtered_data.csv', filtered_file_name)

            return jsonify({
                "filtered_data": filtered_data,
                "spectrogram_path": f'spectrogram/{os.path.basename(spectrogram_path)}',
                "download_link": filtered_file_name
            }), 200

        except Exception as e:
            return jsonify({'error': str(e)}), 500  # Return specific error message

    else:
        return jsonify({'error': 'File type not allowed'}), 400

def upload_to_firebase(file_path, file_name):
    try:
        blob = bucket.blob(file_name)
        blob.upload_from_filename(file_path)
        print(f"Uploaded {file_name} to Firebase Storage.")
    except Exception as e:
        raise ValueError(f"Failed to upload to Firebase: {e}")
    
def generate_signed_url(blob_name):
    blob = bucket.blob(blob_name)
    url = blob.generate_signed_url(expiration=timedelta(minutes=15))  # URL valid for 15 minutes
    return url

@app.route('/api/logs', methods=['GET'])
def get_logs():
    blobs = bucket.list_blobs()  # Fetch all blobs (files) in the storage bucket
    log_data = []
    for blob in blobs:
        signed_url = generate_signed_url(blob.name)  # Generate signed URL for each file
        log_data.append({
            "name": blob.name,
            "time_created": blob.time_created,
            "download_url": signed_url  # Use signed URL instead of public URL
        })
    return jsonify(log_data), 200

def process_csv(file_path):
    try:
        seismic_data = pd.read_csv(file_path)

        if 'rel_time(sec)' not in seismic_data.columns or 'velocity(c/s)' not in seismic_data.columns:
            raise ValueError("CSV file is missing required columns: 'rel_time(sec)' and 'velocity(c/s)'")

        X = seismic_data[['rel_time(sec)']]
        y = seismic_data['velocity(c/s)']

        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        model = RandomForestRegressor(n_estimators=100, random_state=42)
        model.fit(X_train, y_train)

        predictions = model.predict(X)

        seismic_data['filtered'] = predictions

        processed_file_path = os.path.join(PROCESSED_FOLDER, 'filtered_data.csv')
        seismic_data.to_csv(processed_file_path, index=False)

        spectrogram_path = generate_spectrogram(seismic_data)

        return seismic_data.to_dict(orient='records'), spectrogram_path

    except Exception as e:
        raise ValueError(f"Error processing CSV file: {e}")

def generate_spectrogram(data):
    # Generate the spectrogram based on your seismic data
    fs = 1.0  # Sampling frequency, adjust as needed
    f, t, Sxx = spectrogram(data['velocity(c/s)'], fs)

    plt.figure()
    plt.pcolormesh(t, f, 10 * np.log10(Sxx), shading='gouraud')
    plt.ylabel('Frequency [Hz]')
    plt.xlabel('Time [sec]')
    plt.title('Spectrogram of Seismic Data')
    plt.colorbar(label='Intensity [dB]')
    
    # Save the spectrogram image in the processed data folder
    spectrogram_path = os.path.join('processed_data', 'seismic_spectrogram.png')
    plt.savefig(spectrogram_path)
    plt.close()  # Close the figure to free memory

    return spectrogram_path

@app.route('/spectrogram/<filename>')
def serve_spectrogram(filename):
    return send_from_directory('processed_data', filename)

@app.route('/api/download', methods=['GET'])
def download_filtered_data():
    filtered_file_path = os.path.join(PROCESSED_FOLDER, 'filtered_data.csv')
    return send_file(filtered_file_path, as_attachment=True)

def butter_bandpass(lowcut, highcut, fs, order=4):
    nyquist = 0.5 * fs
    low = lowcut / nyquist
    high = highcut / nyquist
    
    if low >= high or low <= 0 or high >= 1:
        raise ValueError("Invalid filter frequencies. Ensure 0 < lowcut < highcut < Nyquist frequency.")
    
    b, a = butter(order, [low, high], btype='band')
    return b, a

def apply_bandpass_filter(data, lowcut, highcut, fs, order=4):
    b, a = butter_bandpass(lowcut, highcut, fs, order=order)
    filtered_data = filtfilt(b, a, data)
    return filtered_data

def filter(df: pd.DataFrame):
    time_diff = df['time_rel(sec)'].diff().mean()
    fs = 1 / time_diff  
    print(f"Calculated Sampling Frequency: {fs} Hz")
    
    lowcut = 0.3  
    highcut = 1   
    
    nyquist = 0.5 * fs
    if lowcut >= nyquist or highcut >= nyquist:
        print(f"Warning: Adjusting highcut and lowcut to be within Nyquist frequency ({nyquist} Hz)")
        highcut = nyquist * 0.9  
        lowcut = min(lowcut, highcut * 0.1)
    
    df['filtered_velocity'] = apply_bandpass_filter(df['velocity(m/s)'].values, lowcut, highcut, fs)
    return df

def give_power(df: pd.DataFrame):
    df["fpower"] = df["filtered_velocity"] ** 2  
    return df

def compute_sta_lta(signal, sta_window, lta_window):
    sta = np.convolve(np.abs(signal), np.ones(sta_window)/sta_window, mode='same')
    lta = np.convolve(np.abs(signal), np.ones(lta_window)/lta_window, mode='same')
    return sta, lta

def process_file(file_path):
    try:
        df = pd.read_csv(file_path)
        print("Data loaded successfully:", df.head())  # Print the first few rows

        df = filter(df)
        print("Data filtered successfully:", df[['time_rel(sec)', 'filtered_velocity']].head())  # Print filtered data

        df = give_power(df)
        print("Power calculated successfully:", df[['filtered_velocity', 'fpower']].head())  # Print power data

        sta_window = 120
        lta_window = 600
        df['STA'], df['LTA'] = compute_sta_lta(df['filtered_velocity'], sta_window, lta_window)

        df['STA/LTA_ratio'] = df['STA'] / (df['LTA'] + 1e-6)  # Prevent division by zero
        
        df.to_csv(os.path.join(PROCESSED_FOLDER, 'processed_seismic_data.csv'), index=False)
        return df
    except Exception as e:
        print(f"Error in processing file: {e}")  # Print error message for debugging
        raise e  # Re-raise the exception to handle it in the API


@app.route('/api/process-seismic', methods=['POST'])
def process_seismic_data():
    # Check if the request contains the file part
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in request'}), 400

    file = request.files['file']

    # Check if the file is actually selected
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # Save the uploaded file
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    # Process the file
    try:
        df = process_file(file_path)
    except Exception as e:
        print(f"Error processing file: {e}")  # Print the error to the console
        return jsonify({'error': str(e)}), 500  # Return the error message to the client

    # Find the max STA/LTA ratio and generate the plot
    id_max = df["STA/LTA_ratio"].idxmax()

    # Plot the seismic data and highlight the max STA/LTA event
    fig, ax = plt.subplots()
    ax.plot(df["time_rel(sec)"], df["velocity(m/s)"], label='Velocity')
    ax.axvline(x=df["time_rel(sec)"][id_max], color='red', label='Seismic Event (Max STA/LTA)')
    ax.set_xlabel('Time (s)')
    ax.set_ylabel('Velocity (m/s)')
    ax.legend()

    # Save the plot to a BytesIO object and return it as an image
    img_io = BytesIO()
    plt.savefig(img_io, format='png')
    plt.close()
    img_io.seek(0)

    return send_file(img_io, mimetype='image/png', attachment_filename='seismic_plot.png')


if __name__ == '__main__':
    app.run(debug=True)
