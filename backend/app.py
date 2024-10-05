import os
import numpy as np
import matplotlib
matplotlib.use('Agg')
<<<<<<< HEAD
from flask import Flask, request, jsonify, send_file, send_from_directory
=======
from flask import Flask, request, jsonify, send_file
>>>>>>> cac3bf7d66b7a1123d005b6d54ca85f5637240c6
from flask_cors import CORS
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
import matplotlib.pyplot as plt
from scipy.signal import spectrogram
<<<<<<< HEAD
import firebase_admin
from firebase_admin import credentials, storage
from datetime import datetime, timedelta
=======
>>>>>>> cac3bf7d66b7a1123d005b6d54ca85f5637240c6

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

UPLOAD_FOLDER = 'uploads/'
PROCESSED_FOLDER = 'processed_data/'
ALLOWED_EXTENSIONS = {'csv'}

<<<<<<< HEAD
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
=======
# Ensure upload and processed folders exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(PROCESSED_FOLDER, exist_ok=True)

# Check if the file extension is allowed
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Route to handle file uploads and AI model processing
@app.route('/api/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 403
>>>>>>> cac3bf7d66b7a1123d005b6d54ca85f5637240c6

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and allowed_file(file.filename):
        try:
            file_path = os.path.join(UPLOAD_FOLDER, file.filename)
            file.save(file_path)

            # Process the file with AI model and filter noise
            filtered_data, spectrogram_path = process_csv(file_path)
<<<<<<< HEAD

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
=======
            return jsonify({"filtered_data": filtered_data, "spectrogram_path": spectrogram_path}), 200

        except Exception as e:
            return jsonify({'error': str(e)}), 500
>>>>>>> cac3bf7d66b7a1123d005b6d54ca85f5637240c6

    else:
        return jsonify({'error': 'File type not allowed'}), 400

<<<<<<< HEAD
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

=======
# Function to process CSV, train AI model, and filter noise
def process_csv(file_path):
    try:
        # Load CSV file
        seismic_data = pd.read_csv(file_path)

        # Ensure the required columns exist
        if 'rel_time(sec)' not in seismic_data.columns or 'velocity(c/s)' not in seismic_data.columns:
            raise ValueError("CSV file is missing required columns: 'rel_time(sec)' and 'velocity(c/s)'")

        # Extract features (X) and target (y)
        X = seismic_data[['rel_time(sec)']]
        y = seismic_data['velocity(c/s)']

        # Use RandomForestRegressor to predict continuous values
>>>>>>> cac3bf7d66b7a1123d005b6d54ca85f5637240c6
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        model = RandomForestRegressor(n_estimators=100, random_state=42)
        model.fit(X_train, y_train)

<<<<<<< HEAD
        predictions = model.predict(X)

        seismic_data['filtered'] = predictions

        processed_file_path = os.path.join(PROCESSED_FOLDER, 'filtered_data.csv')
        seismic_data.to_csv(processed_file_path, index=False)

=======
        # Predict the values for the entire dataset
        predictions = model.predict(X)

        # Add predictions to the dataframe (filtered data)
        seismic_data['filtered'] = predictions

        # Save filtered data to CSV
        processed_file_path = os.path.join(PROCESSED_FOLDER, 'filtered_data.csv')
        seismic_data.to_csv(processed_file_path, index=False)

        # Generate spectrogram
>>>>>>> cac3bf7d66b7a1123d005b6d54ca85f5637240c6
        spectrogram_path = generate_spectrogram(seismic_data)

        return seismic_data.to_dict(orient='records'), spectrogram_path

    except Exception as e:
        raise ValueError(f"Error processing CSV file: {e}")

<<<<<<< HEAD
def generate_spectrogram(data):
    # Generate the spectrogram based on your seismic data
    fs = 1.0  # Sampling frequency, adjust as needed
=======
# Function to generate spectrogram
def generate_spectrogram(data):
    # Assume the sampling rate is 1 Hz for simplicity (adjust as necessary)
    fs = 1.0
>>>>>>> cac3bf7d66b7a1123d005b6d54ca85f5637240c6
    f, t, Sxx = spectrogram(data['velocity(c/s)'], fs)

    plt.figure()
    plt.pcolormesh(t, f, 10 * np.log10(Sxx), shading='gouraud')
    plt.ylabel('Frequency [Hz]')
    plt.xlabel('Time [sec]')
    plt.title('Spectrogram of Seismic Data')
    plt.colorbar(label='Intensity [dB]')
    
<<<<<<< HEAD
    # Save the spectrogram image in the processed data folder
    spectrogram_path = os.path.join('processed_data', 'seismic_spectrogram.png')
=======
    spectrogram_path = os.path.join(PROCESSED_FOLDER, 'seismic_spectrogram.png')
>>>>>>> cac3bf7d66b7a1123d005b6d54ca85f5637240c6
    plt.savefig(spectrogram_path)
    plt.close()  # Close the figure to free memory

    return spectrogram_path

<<<<<<< HEAD
@app.route('/spectrogram/<filename>')
def serve_spectrogram(filename):
    return send_from_directory('processed_data', filename)

=======
# Route to download filtered data as CSV
>>>>>>> cac3bf7d66b7a1123d005b6d54ca85f5637240c6
@app.route('/api/download', methods=['GET'])
def download_filtered_data():
    filtered_file_path = os.path.join(PROCESSED_FOLDER, 'filtered_data.csv')
    return send_file(filtered_file_path, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)
