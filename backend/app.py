import os
import numpy as np
import matplotlib
matplotlib.use('Agg')  # Use a non-interactive backend for saving figures
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
import matplotlib.pyplot as plt
from scipy.signal import spectrogram

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

UPLOAD_FOLDER = 'uploads/'
PROCESSED_FOLDER = 'processed_data/'
ALLOWED_EXTENSIONS = {'csv'}

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
            return jsonify({"filtered_data": filtered_data, "spectrogram_path": spectrogram_path}), 200

        except Exception as e:
            return jsonify({'error': str(e)}), 500

    else:
        return jsonify({'error': 'File type not allowed'}), 400

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
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        model = RandomForestRegressor(n_estimators=100, random_state=42)
        model.fit(X_train, y_train)

        # Predict the values for the entire dataset
        predictions = model.predict(X)

        # Add predictions to the dataframe (filtered data)
        seismic_data['filtered'] = predictions

        # Save filtered data to CSV
        processed_file_path = os.path.join(PROCESSED_FOLDER, 'filtered_data.csv')
        seismic_data.to_csv(processed_file_path, index=False)

        # Generate spectrogram
        spectrogram_path = generate_spectrogram(seismic_data)

        return seismic_data.to_dict(orient='records'), spectrogram_path

    except Exception as e:
        raise ValueError(f"Error processing CSV file: {e}")

# Function to generate spectrogram
def generate_spectrogram(data):
    # Assume the sampling rate is 1 Hz for simplicity (adjust as necessary)
    fs = 1.0
    f, t, Sxx = spectrogram(data['velocity(c/s)'], fs)

    plt.figure()
    plt.pcolormesh(t, f, 10 * np.log10(Sxx), shading='gouraud')
    plt.ylabel('Frequency [Hz]')
    plt.xlabel('Time [sec]')
    plt.title('Spectrogram of Seismic Data')
    plt.colorbar(label='Intensity [dB]')
    
    spectrogram_path = os.path.join(PROCESSED_FOLDER, 'seismic_spectrogram.png')
    plt.savefig(spectrogram_path)
    plt.close()  # Close the figure to free memory

    return spectrogram_path

# Route to download filtered data as CSV
@app.route('/api/download', methods=['GET'])
def download_filtered_data():
    filtered_file_path = os.path.join(PROCESSED_FOLDER, 'filtered_data.csv')
    return send_file(filtered_file_path, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)
