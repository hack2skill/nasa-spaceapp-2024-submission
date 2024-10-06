from flask import Flask, jsonify
from flask_cors import CORS  # Enables communication between frontend and backend
import rasterio  # Used to read Landsat data
import numpy as np

app = Flask(__name__)
CORS(app)

@app.route('/get_landsat_data')
def get_landsat_data():
    # Specify the path to your Landsat image file (GeoTIFF)
    landsat_file_path = 'path/to/your/landsat_image.tif'  # Update this path
    
    try:
        with rasterio.open(landsat_file_path) as src:
            # Read the reflectance data (assuming it's in the first band)
            reflectance_data = src.read(1)  # Read the first band
            reflectance = reflectance_data.flatten().tolist()  # Flatten and convert to list
            
            # Get coordinates (this is just an example, modify as needed)
            coordinates = [src.bounds.left, src.bounds.bottom]
            
            sample_data = {
                'reflectance': reflectance,
                'coordinates': coordinates
            }
            
            return jsonify(sample_data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
