from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np

app = Flask(__name__)
CORS(app)

# Load the all_exoplanets_2021.csv dataset
df_exoplanets = pd.read_csv('updated_exoplanet_data_with_earth.csv')

# Constants for Wien's law and transit depth calculations
WIEN_CONSTANT = 2.898e6  # nm * K, Wien's displacement constant
R_JUPITER = 7.1492e7  # Radius of Jupiter in meters
R_SUN = 6.9634e8  # Radius of the Sun in meters

# Simulate planet radius (if not available)
df_exoplanets['Planet Radius'] = np.random.uniform(0.5, 2.0, len(df_exoplanets))  # R_Jupiter in units of Jupiter radii

# Fill missing values for stellar radius and temperature with median values
df_exoplanets['Stellar Radius'] = df_exoplanets['Stellar Radius'].fillna(df_exoplanets['Stellar Radius'].median())
df_exoplanets['Stellar Effective Temperature'] = df_exoplanets['Stellar Effective Temperature'].fillna(df_exoplanets['Stellar Effective Temperature'].median())

# Calculate the wavelength using Wien's law
df_exoplanets['Wavelength (nm)'] = WIEN_CONSTANT / df_exoplanets['Stellar Effective Temperature']

# Calculate transit depth using the formula ΔF = (R_p / R_s)^2
df_exoplanets['Transit Depth'] = (df_exoplanets['Planet Radius'] * R_JUPITER / (df_exoplanets['Stellar Radius'] * R_SUN)) ** 2

# Route to handle both planet names retrieval and data retrieval
@app.route('/planets', methods=['GET', 'POST'])
def planets():
    if request.method == 'GET':
        # Send all the exoplanet names for the dropdown
        planet_names = df_exoplanets['Planet Name'].unique().tolist()
        return jsonify({'planet_names': planet_names})

    if request.method == 'POST':
        selected_planet = request.json['planet']  # Using JSON input
        
        # Filter the exoplanet data for the selected planet
        planet_data = df_exoplanets[df_exoplanets['Planet Name'] == selected_planet]
        
        # Check if any data exists for this planet
        if planet_data.empty:
            return jsonify({'error': 'No data available for the selected planet.'})

        # Simulate multiple instances to generate more data points using predictive modeling
        num_simulations = 50  # Number of simulated points
        simulated_data = []
        
        for i in range(num_simulations):
            # Vary Stellar Radius and Effective Temperature slightly for each simulation
            temp_stellar_radius = planet_data['Stellar Radius'].values[0] * np.random.uniform(0.95, 1.05)
            temp_stellar_temp = planet_data['Stellar Effective Temperature'].values[0] * np.random.uniform(0.95, 1.05)
            
            # Recalculate wavelength and transit depth for each simulation
            wavelength = WIEN_CONSTANT / temp_stellar_temp
            transit_depth = (planet_data['Planet Radius'].values[0] * R_JUPITER / (temp_stellar_radius * R_SUN)) ** 2
            
            simulated_data.append([wavelength, transit_depth])

        # Convert simulated data to DataFrame
        df_simulated = pd.DataFrame(simulated_data, columns=['Wavelength (nm)', 'Transit Depth'])
        
        # Aggregate the simulated data for averaging
        df_grouped = df_simulated.groupby('Wavelength (nm)').mean().reset_index()

        # Simulate error values for upper and lower bounds
        upper_error = np.random.uniform(0.0001, 0.0005, len(df_grouped)).tolist()
        lower_error = np.random.uniform(0.0001, 0.0005, len(df_grouped)).tolist()

        # Prepare data to send to the frontend
        wavelengths = df_grouped['Wavelength (nm)'].tolist()
        transit_depth = df_grouped['Transit Depth'].tolist()  # Averaged transit depth from simulations

        # Return the data as JSON
        return jsonify({
            'wavelengths': wavelengths,
            'transit_depth': transit_depth,
            'upper_error': upper_error,
            'lower_error': lower_error,
            'planet_name': selected_planet
        })

if __name__ == '__main__':
    app.run(debug=True, port=3000)
