from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import ee
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
import uvicorn

# Initialize FastAPI app
app = FastAPI()

# Authenticate and initialize Earth Engine
def initialize_ee():
    try:
        ee.Initialize(project='ee-prakharagra10')
        print("Earth Engine initialized successfully.")
    except ee.EEException as e:
        raise RuntimeError(f"Initialization error: {e}")

initialize_ee()

# Train a Random Forest model for NDVI prediction
def train_random_forest():
    # Define the region of interest
    geometry = ee.Geometry.Rectangle([74.4, 31.4, 78.0, 33.0])

    # Load MODIS NDVI dataset
    ndvi_dataset = ee.ImageCollection('MODIS/061/MOD13A1') \
                    .filterDate('2023-01-01', '2023-12-31') \
                    .select('NDVI')

    # Reduce NDVI data to a mean value over the specified region and time
    mean_ndvi = ndvi_dataset.mean().reduceRegion(
        reducer=ee.Reducer.mean(),
        geometry=geometry,
        scale=1000
    )

    # Get NDVI value and scale it
    ndvi_value = mean_ndvi.get('NDVI').getInfo() / 10000

    # Generate synthetic features (5 features for illustration)
    features = np.random.rand(100, 5)
    labels = ndvi_value + np.random.randn(100) * 0.05  # NDVI with noise

    # Train-test split
    X_train, X_test, y_train, y_test = train_test_split(features, labels, test_size=0.3, random_state=42)

    # Random Forest model
    rf_model = RandomForestRegressor(n_estimators=100, random_state=42)
    rf_model.fit(X_train, y_train)

    return rf_model, X_test, y_test

# Train the Random Forest model
rf_model, X_test, y_test = train_random_forest()

# Define a Pydantic model for input validation
class PredictionInput(BaseModel):
    temperature: float   # Feature 1: Temperature (°C)
    precipitation: float # Feature 2: Precipitation (mm)
    soil_moisture: float # Feature 3: Soil Moisture (%)
    humidity: float      # Feature 4: Relative Humidity (%)
    elevation: float     # Feature 5: Elevation (m above sea level)

# Endpoint for NDVI prediction
@app.post("/predict")
async def predict_ndvi(input_data: PredictionInput):
    # Extract features from the input data
    features = np.array([[input_data.temperature, input_data.precipitation, 
                          input_data.soil_moisture, input_data.humidity, 
                          input_data.elevation]])
    
    # Predict NDVI using the Random Forest model
    predicted_ndvi = rf_model.predict(features)
    
    return {"predicted_ndvi": predicted_ndvi[0]}

# Endpoint to get model metrics
@app.get("/metrics")
async def get_metrics():
    # Predictions for test data
    y_pred = rf_model.predict(X_test)
    
    # Calculate accuracy metrics
    mse = mean_squared_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)
    
    return {"mean_squared_error": mse, "r2_score": r2}

# Run the app using uvicorn
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
