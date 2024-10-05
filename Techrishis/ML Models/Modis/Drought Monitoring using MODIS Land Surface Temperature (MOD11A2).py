import ee
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score

# Authenticate and initialize Earth Engine
ee.Authenticate()

# Initialize Earth Engine with the Cloud Project ID
try:
    ee.Initialize(project='ee-prakharagra10')
    print("Initialized successfully with the specified project.")
except ee.EEException as e:
    print(f"Initialization error: {e}")

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

# Generate synthetic features
features = np.random.rand(100, 1)
labels = lst_value + np.random.randn(100) * 2  # Add some noise

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(features, labels, test_size=0.3, random_state=42)

# Linear Regression model
model = LinearRegression()
model.fit(X_train, y_train)

# Get user input and predict LST (hardcoded input instead of dynamic user input)
# Commented out the user input line for hardcoding
# user_input = float(input("Enter a feature (e.g., temperature in °C): "))

# Hardcoded user input
user_input = 0.5  # Example value
user_feature = np.array([[user_input]])
predicted_lst = model.predict(user_feature)
print(f"Predicted Land Surface Temperature for feature {user_input}: {predicted_lst[0]} °C")

# Predictions and plot
y_pred = model.predict(X_test)

# Calculate performance metrics
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)
print(f"Mean Squared Error (MSE): {mse}")
print(f"R² Score: {r2}")

# Plot actual vs predicted
plt.scatter(X_test, y_test, color='blue', label='Actual')
plt.plot(X_test, y_pred, color='red', label='Predicted')
plt.xlabel('Feature')
plt.ylabel('Land Surface Temperature (°C)')
plt.title('LST Prediction using Linear Regression')
plt.legend()
plt.show()
