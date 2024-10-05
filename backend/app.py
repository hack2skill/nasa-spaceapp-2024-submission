from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor

app = Flask(__name__)
CORS(app)

seismic_data = pd.read_json('data/seismic_data.json')

@app.route('/api/seismic_data', methods=['GET'])
def get_seismic_data():
    data = seismic_data.to_dict(orient='records')
    return jsonify(data)

@app.route('/api/train_model', methods=['POST'])
def train_model():
    X = seismic_data[['rel_time(sec)']] 
    y = seismic_data['velocity(c/s)']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    accuracy = model.score(X_test, y_test)

    return jsonify({"accuracy": accuracy})

if __name__ == '__main__':
    app.run(debug=True)