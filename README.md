[Uploading new NASA (1).pdf…]()
# NASA Space Apps Challenge 2024 [Noida]

#### Team Name -
Tech blazers 
#### Problem Statement - 
Development of map matching algorithm using AI-ML techniques to distinguish vehicular movement on highway and service road.
#### Team Leader Email -
srs37sahoo@gmail.com

## A Brief of the Prototype:
  What is your solution? and how it works.
  This solution outlines a comprehensive system for vehicle tracking using GNSS (Global Navigation Satellite System) and OBU (Onboard Unit) data. Here’s a detailed breakdown of how the solution would work and its implementation:

1. Data Collection

GNSS Data: Vehicle GNSS data, which provides the geographical position (latitude, longitude), is collected in real-time.

OBU Data: Onboard Units (OBU) provide additional vehicle information such as speed, fuel usage, or diagnostics. This data is continuously collected from vehicles and stored in a database.


2. Data Preprocessing

GNSS Data (Noise Filtering): GNSS data can have noise or errors due to signal interruptions or multi-path reflections. A Kalman filter is used to smooth the data and estimate the vehicle's true position by filtering out noise.

Outlier Removal: Outliers in GNSS data that don't match typical movement patterns are detected using statistical methods or thresholding and removed to ensure consistency.

OBU Data Cleaning: OBU data is cleaned by removing any corrupted or missing data entries. Formatting includes converting it into a structured format for easier analysis.

Smoothing/Interpolation: Missing or inconsistent data points are filled or smoothed using interpolation techniques to provide continuous data, ensuring no gaps.


3. Data Integration

After preprocessing, the cleaned GNSS and OBU data are combined. This integration creates a cohesive dataset that contains positional, diagnostic, and performance data of the vehicle over time, making it easier to apply advanced analysis and machine learning.


4. Map Alignment

GIS Tools: Geographic Information System (GIS) tools are used to align the integrated data (vehicle positions) with a digital map. This process ensures that the vehicle's location is represented accurately in relation to the actual road network or geography. GIS also enables visualization and analysis of spatial data.


5. Machine Learning Model

Training the Model: With the integrated and aligned data, a machine learning model is trained. This model could be designed to predict future vehicle locations, estimate routes, or detect anomalies. Various algorithms, like regression models or neural networks, can be used depending on the objectives (e.g., tracking or forecasting vehicle movement).


6. Real-Time Data Processing

Collection: Real-time GNSS and OBU data are continuously gathered and fed into the system.

Processing: The trained machine learning model processes this real-time data, enabling real-time vehicle tracking, status updates, or anomaly detection (e.g., unusual driving patterns).


7. Data Visualization

GIS Visualization: The processed data is visualized using GIS-based tools that display vehicle locations on a digital map. This real-time visualization allows fleet managers or users to monitor the movement and status of vehicles directly.


8. Data Privacy & Security

Encryption: Since the system deals with sensitive vehicle data, encryption protocols are applied to protect the privacy of data during storage and transmission. This could involve encrypting the data using symmetric or asymmetric key algorithms.

Security: Secure data transmission over networks ensures that data is protected from unauthorized access. Techniques such as HTTPS, VPNs, or other secure network protocols will be utilized. Additionally, role-based access control ensures that only authorized personnel can view or manipulate the data.


Summary of Implementation:

Data Collection and Preprocessing: GNSS and OBU data are collected in real-time. Preprocessing cleans the data, removes outliers, and ensures accuracy using Kalman filtering.

Integration and Alignment: The clean data is integrated and aligned to digital maps using GIS tools.

Model Training: A machine learning model is trained on this integrated and aligned data to enable accurate tracking or prediction.

Real-Time Tracking: The model processes real-time data and provides insights (like vehicle tracking or anomaly detection) in real-time.

Visualization: Vehicle locations are displayed on a GIS map for easy monitoring.

Privacy and Security: Encryption and security measures are applied to protect the integrity and privacy of data.


This system offers a robust framework for accurate, secure, and real-time vehicle tracking and data analysis.


## Code Execution Instruction:
  *[If your solution is **not** application based, you can ignore this para]
  To implement this solution, several components are required, including data collection, preprocessing, machine learning, map alignment, and visualization. Below is a Python-based executable code that outlines the key parts of the system. It assumes you have GNSS and OBU data available and covers basic filtering, interpolation, integration, model training, and visualization. This code is modular, allowing it to be adapted to specific data formats.

Required Libraries:

pip install pandas numpy scikit-learn matplotlib geopandas folium

1. Data Collection (Simulated)

Here, we'll simulate the GNSS and OBU data collection.

import pandas as pd
import numpy as np

# Simulate GNSS data
gnss_data = pd.DataFrame({
    'timestamp': pd.date_range(start='2023-01-01', periods=100, freq='S'),
    'latitude': np.random.uniform(low=50.0, high=51.0, size=100),
    'longitude': np.random.uniform(low=4.0, high=5.0, size=100)
})

# Simulate OBU data
obu_data = pd.DataFrame({
    'timestamp': pd.date_range(start='2023-01-01', periods=100, freq='S'),
    'speed': np.random.uniform(low=20, high=100, size=100),
    'fuel_usage': np.random.uniform(low=5, high=15, size=100)
})

2. Data Preprocessing

This includes noise filtering (Kalman filter), outlier removal, and interpolation for missing data.

from pykalman import KalmanFilter
from scipy import interpolate

# Kalman filter to smooth GNSS data (latitude and longitude)
def kalman_filter(data):
    kf = KalmanFilter(initial_state_mean=0, n_dim_obs=2)
    measurements = data[['latitude', 'longitude']].values
    kf = kf.em(measurements, n_iter=5)
    smoothed_state_means, _ = kf.smooth(measurements)
    data['latitude'], data['longitude'] = smoothed_state_means[:, 0], smoothed_state_means[:, 1]
    return data

gnss_data = kalman_filter(gnss_data)

# Removing outliers (for example, based on speed)
gnss_data = gnss_data[np.abs(gnss_data['latitude'] - gnss_data['latitude'].mean()) < 0.01]
gnss_data = gnss_data[np.abs(gnss_data['longitude'] - gnss_data['longitude'].mean()) < 0.01]

# Interpolation for missing OBU data
obu_data.interpolate(method='linear', inplace=True)

3. Data Integration

Combine the cleaned GNSS and OBU data.

# Merge GNSS and OBU data on timestamps
integrated_data = pd.merge_asof(gnss_data, obu_data, on='timestamp')

4. Map Alignment with GIS Tools

Use the geopandas library for map alignment and the folium library for visualization.

import geopandas as gpd
import folium

# Assuming integrated_data contains cleaned lat/lon values
# Initialize map at the first GNSS point
m = folium.Map(location=[integrated_data['latitude'].iloc[0], integrated_data['longitude'].iloc[0]], zoom_start=12)

# Add points to the map
for idx, row in integrated_data.iterrows():
    folium.Marker([row['latitude'], row['longitude']], popup=f"Speed: {row['speed']}, Fuel: {row['fuel_usage']}").add_to(m)

# Save map
m.save('vehicle_tracking_map.html')

5. Machine Learning Model Training

Here we train a basic regression model (e.g., predicting speed based on location).

from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error

# Prepare data for model
X = integrated_data[['latitude', 'longitude']]
y = integrated_data['speed']

# Split into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train a simple linear regression model
model = LinearRegression()
model.fit(X_train, y_train)

# Predictions
y_pred = model.predict(X_test)

# Evaluate the model
print("Mean Squared Error:", mean_squared_error(y_test, y_pred))

6. Real-Time Data Processing (Simulation)

This is a simulated example of feeding real-time GNSS and OBU data into the model.

# Simulate real-time data collection
real_time_data = pd.DataFrame({
    'timestamp': pd.date_range(start='2023-01-02', periods=10, freq='S'),
    'latitude': np.random.uniform(low=50.0, high=51.0, size=10),
    'longitude': np.random.uniform(low=4.0, high=5.0, size=10),
    'speed': np.random.uniform(low=20, high=100, size=10),
    'fuel_usage': np.random.uniform(low=5, high=15, size=10)
})

# Predict speed based on the new real-time data (just as an example)
real_time_X = real_time_data[['latitude', 'longitude']]
real_time_predictions = model.predict(real_time_X)

# Output predictions
real_time_data['predicted_speed'] = real_time_predictions
print(real_time_data[['timestamp', 'latitude', 'longitude', 'predicted_speed']])

7. Data Visualization

The real-time vehicle locations are displayed on the map, already handled by the folium map created earlier.

8. Data Privacy & Security

For privacy and security, you'd typically implement HTTPS encryption for data transfer and use libraries like cryptography for encrypting stored data. Here's a simple demonstration using Python's cryptography library.

pip install cryptography

from cryptography.fernet import Fernet

# Generate key and encrypt data (for demonstration)
key = Fernet.generate_key()
cipher_suite = Fernet(key)

# Convert GNSS data to bytes and encrypt
encrypted_latitude = cipher_suite.encrypt(integrated_data['latitude'].astype(str).str.encode())
encrypted_longitude = cipher_suite.encrypt(integrated_data['longitude'].astype(str).str.encode())

# Decrypt example (for demonstration)
decrypted_latitude = cipher_suite.decrypt(encrypted_latitude).decode()
print(decrypted_latitude)

Conclusion:

This is an executable system that handles the vehicle tracking problem. It:

Collects data (GNSS and OBU).

Preprocesses the data with filtering, outlier removal, and interpolation.

Combines the data into an integrated dataset.

Aligns the data on a map using GIS tools.

Trains a machine learning model on this integrated data.

Processes real-time data to predict and track vehicle locations.

Visualizes the results on a map.

Secures the data using encryption.



  
 *The Repository must contain your **Execution Plan PDF**.
