from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

file_path = 'all_exoplanets_2021.csv'
exoplanets_df = pd.read_csv(file_path)
exoplanets_df.fillna(exoplanets_df.median(numeric_only=True), inplace=True)

@app.route('/')
def index():
    return jsonify({"message": "Exoplanet data analysis API. Use '/generate_graphs' endpoint with POST request to get data for visualizations."})

@app.route('/generate_graphs', methods=['POST'])
def generate_graphs():
    data = request.json
    method = data.get('method', 'all')

    filtered_discovery = exoplanets_df if method == 'all' else exoplanets_df[exoplanets_df['Discovery Method'] == method]

    discovery_count = filtered_discovery.groupby('Discovery Year')['No.'].count().reset_index()
    facility_count = filtered_discovery.groupby('Discovery Facility')['No.'].count().nlargest(10).reset_index()
    planetary_data = filtered_discovery[['Mass', 'Orbital Period Days', 'Discovery Method']].dropna()
    stellar_data = filtered_discovery[['Stellar Mass', 'Stellar Effective Temperature', 'Discovery Method']].dropna()
    distance_data = filtered_discovery[['Distance']].dropna()

    return jsonify({
        'discovery_count': {
            'x': discovery_count['Discovery Year'].tolist(),
            'y': discovery_count['No.'].tolist(),
            'title': f'Discovery Trends ({method})',
            'x_label': 'Discovery Year',
            'y_label': 'Number of Discoveries'
        },
        'facility_count': {
            'x': facility_count['Discovery Facility'].tolist(),
            'y': facility_count['No.'].tolist(),
            'title': f'Top Facilities for {method} Discoveries',
            'x_label': 'Discovery Facility',
            'y_label': 'Number of Discoveries'
        },
        'planetary_data': {
            'x': planetary_data['Mass'].tolist(),
            'y': planetary_data['Orbital Period Days'].tolist(),
            'color': planetary_data['Discovery Method'].tolist(),
            'title': f'Planetary Mass vs Orbital Period ({method})',
            'x_label': 'Planet Mass',
            'y_label': 'Orbital Period (Days)'
        },
        'stellar_data': {
            'x': stellar_data['Stellar Mass'].tolist(),
            'y': stellar_data['Stellar Effective Temperature'].tolist(),
            'color': stellar_data['Discovery Method'].tolist(),
            'title': f'Stellar Mass vs Temperature ({method})',
            'x_label': 'Stellar Mass (M_sun)',
            'y_label': 'Stellar Temperature (K)'
        },
        'distance_data': {
            'x': distance_data['Distance'].tolist(),
            'title': f'Distance Distribution of {method} Discoveries',
            'x_label': 'Distance (light years)',
            'nbins': 30  # Provide bin information if needed for histogram
        }
    })

if __name__ == '__main__':
    app.run(debug=True)
