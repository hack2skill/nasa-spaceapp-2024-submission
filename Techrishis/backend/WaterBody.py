from fastapi import FastAPI
from pydantic import BaseModel
import ee
import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
import uvicorn

# Initialize FastAPI app
app = FastAPI()

# Initialize Earth Engine
def initialize_ee():
    try:
        ee.Initialize(project='ee-prakharagra10')
        print("Earth Engine initialized successfully.")
    except ee.EEException as e:
        raise RuntimeError(f"Initialization error: {e}")

initialize_ee()

# Logistic Regression model training
def train_logistic_regression():
    # Define the region of interest (customize with your area coordinates)
    geometry = ee.Geometry.Rectangle([74.4, 31.4, 78.0, 33.0])

    # Load MODIS Surface Reflectance dataset
    surface_reflectance = ee.ImageCollection('MODIS/006/MOD09A1') \
                           .filterDate('2023-01-01', '2023-12-31') \
                           .select('sur_refl_b01')

    # Reduce the dataset to mean reflectance value
    mean_reflectance = surface_reflectance.mean().reduceRegion(
        reducer=ee.Reducer.mean(),
        geometry=geometry,
        scale=1000
    )

    # Get reflectance value
    reflectance_value = mean_reflectance.get('sur_refl_b01').getInfo()
    print(f"Reflectance Value: {reflectance_value}")

    # Create synthetic water detection features (e.g., reflectance, precipitation)
    np.random.seed(42)  # For reproducibility
    features = np.random.rand(100, 3)

    # Generate labels: reflectance > 0.2 indicates water (label = 1), else non-water (label = 0)
    labels = (reflectance_value + np.random.randn(100) * 0.05 > 0.2).astype(int)

    # Ensure both classes are present in the labels
    if len(np.unique(labels)) < 2:
        labels[:50] = 0  # Force half the data to be labeled as non-water (0)

    # Train-test split
    X_train, X_test, y_train, y_test = train_test_split(features, labels, test_size=0.3, random_state=42)

    # Logistic Regression model
    lr_model = LogisticRegression()
    lr_model.fit(X_train, y_train)

    return lr_model, X_test, y_test

# Train the Logistic Regression model
lr_model, X_test, y_test = train_logistic_regression()

# Define a Pydantic model for input validation
class PredictionInput(BaseModel):
    reflectance: float   # Reflectance value (e.g., 0.1 to 0.5)
    precipitation: float # Precipitation (e.g., 0 to 1)
    temperature: float   # Temperature (e.g., 0 to 1)

# Endpoint for water detection prediction
@app.post("/predict")
async def predict_water(input_data: PredictionInput):
    # Extract features from the input data
    user_input = np.array([[input_data.reflectance, input_data.precipitation, input_data.temperature]])
    
    # Predict water/non-water using Logistic Regression
    prediction = lr_model.predict(user_input)

    if prediction[0] == 1:
        return {"predicted": "Water detected in the area."}
    else:
        return {"predicted": "No water detected in the area."}

# Endpoint to get model metrics
@app.get("/metrics")
async def get_metrics():
    # Predictions for test data
    y_pred = lr_model.predict(X_test)
    
    # Calculate accuracy metrics
    accuracy = accuracy_score(y_test, y_pred)
    precision = precision_score(y_test, y_pred)
    recall = recall_score(y_test, y_pred)
    f1 = f1_score(y_test, y_pred)
    
    return {
        "accuracy": accuracy,
        "precision": precision,
        "recall": recall,
        "f1_score": f1
    }

# Run the FastAPI app
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
