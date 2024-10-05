from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pickle
import os
import pandas as pd
import numpy as np
import requests
from dotenv import load_dotenv
from sklearn.preprocessing import StandardScaler

# Load environment variables from .env file
load_dotenv()
api_key = os.getenv('WEATHER_API_KEY')

if not api_key:
    raise ValueError("API key not found. Please set it in the .env file.")

# Load the trained model and scaler
with open('model.pkl', 'rb') as f:
    model = pickle.load(f)

with open('scaler.pkl', 'rb') as f:
    scaler = pickle.load(f)

# Define the feature names used in training
feature_names = ['LON', 'LAT', 'RANGE', 'AZIMUTH', 'SEVPROB', 'PROB', 'MAXSIZE', 'RANGE_AZIMUTH']

# Define a mapping from model output to weather events
event_mapping = {
    -999: 'No Severe Weather Data',
    0: 'No Severe Weather',
    10: 'Thunderstorm',
    20: 'Hail',
    30: 'Heavy Rain',
    40: 'Tornado',
    50: 'Flood',
    60: 'Snowstorm',
    70: 'High Winds',
    80: 'Blizzard',
    90: 'Freezing Rain',
    100: 'Dust Storm'
}

# FastAPI app instance
app = FastAPI()

# Input validation with Pydantic
class WeatherRequest(BaseModel):
    latitude: float
    longitude: float
    month: str

# Function to get weather data from Weatherbit API
def get_weather_data(longitude, latitude):
    url = f"https://api.weatherbit.io/v2.0/current?lat={latitude}&lon={longitude}&key={api_key}&include=alerts"
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
        severity_probability = data['data'][0].get('precip', 0)  # Example: Precipitation as severity
        probability = data['data'][0].get('clouds', 0) / 100     # Example: Cloud coverage as probability
        max_size = data['data'][0].get('hail', 2.0)              # Example: Hail size (if available)
        return severity_probability, probability, max_size
    else:
        print(f"Error: Unable to fetch weather data, status code {response.status_code}")
        return 0.5, 0.5, 2.0  # Fallback values

# Function to calculate features
def calculate_features(longitude, latitude):
    severity_probability, probability, max_size = get_weather_data(longitude, latitude)
    range_value = np.sqrt(longitude**2 + latitude**2)
    azimuth = np.arctan2(longitude, latitude) * (180 / np.pi)
    range_azimuth = range_value * azimuth
    
    return {
        'LON': longitude,
        'LAT': latitude,
        'RANGE': range_value,
        'AZIMUTH': azimuth,
        'SEVPROB': severity_probability,
        'PROB': probability,
        'MAXSIZE': max_size,
        'RANGE_AZIMUTH': range_azimuth
    }

# Prediction endpoint
@app.post("/predict")
def predict_weather_event(request: WeatherRequest):
    try:
        # Calculate features
        features = calculate_features(request.longitude, request.latitude)

        # Create a DataFrame with the appropriate feature names
        input_data = pd.DataFrame([features], columns=feature_names)

        # Ensure columns are in the same order as used during fitting
        input_data = input_data[feature_names]

        # Apply the same transformations to the input data
        input_data_scaled = scaler.transform(input_data)

        # Make prediction
        prediction = model.predict(input_data_scaled)

        # Map prediction to a human-readable weather event
        event = event_mapping.get(prediction[0], 'Unknown Weather Event')

        return {
            "month": request.month,
            "predicted_event": event,
            "precaution": "Please note that weather predictions are subject to change and should be verified with local weather services."
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
