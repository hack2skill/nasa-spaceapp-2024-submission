from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.linear_model import LinearRegression
import numpy as np
from sklearn.cluster import KMeans

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Load dataset and preprocess
file_path = 'all_exoplanets_2021.csv'
exoplanets_df = pd.read_csv(file_path)
exoplanets_df.fillna(exoplanets_df.median(numeric_only=True), inplace=True)

# Function to generate orbit data
def generate_orbit(semi_major_axis, eccentricity):
    if pd.isna(semi_major_axis) or pd.isna(eccentricity):
        return None
    t = np.linspace(0, 2 * np.pi, 100)
    x = semi_major_axis * (np.cos(t) - eccentricity)
    y = semi_major_axis * np.sqrt(1 - eccentricity ** 2) * np.sin(t)
    return {'x': x.tolist(), 'y': y.tolist()}

# Function to calculate the habitability score
def calculate_habitability(row):
    L_star = row['Stellar Effective Temperature']
    S_flux = row['Insolation Flux']
    T_star = row['Stellar Effective Temperature']
    R_star = row['Stellar Radius']
    D = row['Orbit Semi-Major Axis']

    if np.isnan(L_star) or np.isnan(S_flux) or np.isnan(T_star) or np.isnan(R_star) or np.isnan(D):
        return 0

    score = 0
    T_eq = T_star * (R_star / (2 * D)) ** 0.5
    if 2000 < T_star < 7000:
        score += 2
    if 0.5 < D < 1.5:
        score += 2
    if 0.8 <= row['Mass'] <= 2.5:
        score += 2
    if 0.5 < S_flux < 1.5:
        score += 2

    return score

@app.route('/')
def index():
    return jsonify({"message": "Exoplanet data analysis API. Use '/generate_visuals' endpoint with POST request to get data for visualizations."})

@app.route('/generate_visuals', methods=['POST'])
def generate_visuals():
    selected_planet = request.json.get('planet')  # Get the planet name from the request
    matching_planets = exoplanets_df[exoplanets_df['Planet Name'] == selected_planet]

    if matching_planets.empty:
        return jsonify({'error': 'Planet not found'}), 404

    planet_data = matching_planets.iloc[0]  # Select the first matching planet
    habitability_score = calculate_habitability(planet_data)

    # Prepare scatter plot data (Mass vs Orbital Period)
    scatter_data = exoplanets_df[['Orbital Period Days', 'Mass']].dropna().to_dict('records')

    # K-Means clustering (Mass vs Stellar Radius)
    kmeans = KMeans(n_clusters=3)
    data_for_clustering = exoplanets_df[['Mass', 'Stellar Radius']].fillna(exoplanets_df.median(numeric_only=True))
    kmeans_clusters = kmeans.fit_predict(data_for_clustering)
    kmeans_data = {
        'clusters': kmeans_clusters.tolist(),
        'features': data_for_clustering.to_dict('records')
    }

    # Orbit visualization data
    orbit_data = generate_orbit(planet_data['Orbit Semi-Major Axis'], planet_data['Eccentricity'])

    # Linear regression for Mass vs Orbital Period
    x_values = exoplanets_df[['Orbital Period Days']].values.reshape(-1, 1)
    y_values = exoplanets_df['Mass'].values
    reg_model = LinearRegression().fit(x_values, y_values)
    regression_line = reg_model.predict(x_values).tolist()

    # Correlation matrix data
    selected_columns = ['Mass', 'Orbital Period Days', 'Stellar Effective Temperature', 'Distance']
    correlation_matrix = exoplanets_df[selected_columns].corr().values.tolist()

    return jsonify({
        'habitability_score': habitability_score,
        'scatter_data': scatter_data,
        'regression_line': regression_line,
        'correlation_matrix': correlation_matrix,
        'labels': selected_columns,
        'orbit_data': orbit_data,
        'kmeans_clusters': kmeans_data
    })

if __name__ == "__main__":
    app.run(debug=True, port=2000)
