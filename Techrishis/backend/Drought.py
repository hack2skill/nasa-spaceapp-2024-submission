from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import ee
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
import uvicorn

# Initialize FastAPI app
app = FastAPI()

# Initialize Earth Engine
try:
    ee.Initialize(project='ee-prakharagra10')
except ee.EEException as e:
    print(f"Initialization error: {e}")

# Train a simple linear regression model
# This will be used for predictions later
def train_model():
    # Define the region of interest (customize with your area coordinates)
    geometry = ee.Geometry.Rectangle([74.4, 31.4, 78.0, 33.0])

    # Load the MODIS Land Surface Temperature dataset
    dataset = ee.ImageCollection('MODIS/061/MOD11A2') \
                .filterDate('2023-01-01', '2023-12-31') \
                .select('LST_Day_1km')

    # Reduce dataset to mean LST over the time period and region
    mean_lst = dataset.mean().reduceRegion(
        reducer=ee.Reducer.mean(),
        geometry=geometry,
        scale=1000
    )

    # Get the result and convert it to a numpy array
    lst_value = mean_lst.get('LST_Day_1km').getInfo() * 0.02  # Apply scaling factor

    # Generate synthetic features and labels for training
    features = np.random.rand(100, 1)
    labels = lst_value + np.random.randn(100) * 2  # Add noise to labels

    # Train-test split
    X_train, X_test, y_train, y_test = train_test_split(features, labels, test_size=0.3, random_state=42)

    # Linear Regression model
    model = LinearRegression()
    model.fit(X_train, y_train)

    return model, X_test, y_test

# Train the model
model, X_test, y_test = train_model()

# Define a Pydantic model for input validation
class PredictionInput(BaseModel):
    feature: float

# Route to get LST prediction
@app.post("/predict")
async def predict(input_data: PredictionInput):
    # Extract the feature from the input data
    feature = input_data.feature
    user_feature = np.array([[feature]])
    
    # Predict Land Surface Temperature using the trained model
    predicted_lst = model.predict(user_feature)
    
    return {"feature": feature, "predicted_lst": predicted_lst[0]}

# Route to get model metrics (optional)
@app.get("/metrics")
async def get_metrics():
    # Make predictions on the test data
    y_pred = model.predict(X_test)
    
    # Calculate performance metrics
    mse = mean_squared_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)
    
    return {
        "mean_squared_error": mse,
        "r2_score": r2
    }

# Run the app using uvicorn
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
