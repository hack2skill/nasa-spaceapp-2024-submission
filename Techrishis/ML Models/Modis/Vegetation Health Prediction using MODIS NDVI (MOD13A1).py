import ee
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score

# Authenticate and initialize Earth Engine
ee.Authenticate()

# Initialize Earth Engine with the Cloud Project ID
try:
    ee.Initialize(project='ee-prakharagra10')
    print("Initialized successfully with the specified project.")
except ee.EEException as e:
    print(f"Initialization error: {e}")

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

# Get user input and predict NDVI
# Commenting out dynamic input and hardcoding the values instead
# user_input = np.array([[
#     float(input("Enter average temperature (°C): ")),    # Feature 1: Temperature
#     float(input("Enter total precipitation (mm): ")),    # Feature 2: Precipitation
#     float(input("Enter soil moisture (%): ")),           # Feature 3: Soil Moisture
#     float(input("Enter relative humidity (%): ")),       # Feature 4: Humidity
#     float(input("Enter elevation (m above sea level): "))# Feature 5: Elevation
# ]])

# Hardcoded user input values
user_input = np.array([[25.0, 50.0, 30.0, 60.0, 500.0]])  # Example values
predicted_ndvi = rf_model.predict(user_input)
print(f"Predicted NDVI for the given features: {predicted_ndvi[0]}")

# Predictions for test data
y_pred = rf_model.predict(X_test)

# Calculate accuracy metrics
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)
print(f"Mean Squared Error (MSE): {mse}")
print(f"R² Score: {r2}")

# Plot actual vs predicted NDVI values
plt.scatter(range(len(y_test)), y_test, color='green', label='Actual NDVI')
plt.plot(range(len(y_pred)), y_pred, color='orange', label='Predicted NDVI')
plt.xlabel('Samples')
plt.ylabel('NDVI')
plt.title('NDVI Prediction using Random Forest')
plt.legend()
plt.show()
