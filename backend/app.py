from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor

app = Flask(__name__)

# Enable CORS for all routes, allowing requests from Vite frontend (localhost:3000)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

# Load seismic data from the JSON file
seismic_data = pd.read_json('./data/seismic_data.json')

# API to return seismic data
@app.route('/api/seismic_data', methods=['GET'])
def get_seismic_data():
    data = seismic_data.to_dict(orient='records')
    return jsonify(data)

# API to train the AI model and return accuracy
@app.route('/api/train_model', methods=['POST'])
def train_model():
    # Extract the features (X) and target (y) from seismic data
    X = seismic_data[['rel_time(sec)']]  # Input: relative time
    y = seismic_data['velocity(c/s)']    # Target: velocity

    # Split the dataset into training and testing sets (80% training, 20% testing)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Train the RandomForest model
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    # Evaluate the model on the test set
    accuracy = model.score(X_test, y_test)

    # Return the model's accuracy as a response
    return jsonify({"accuracy": accuracy})

if __name__ == '__main__':
    app.run(debug=True)
