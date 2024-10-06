import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

# Read the CSV file
df = pd.read_csv('XB.ELYSE.02.BHV.2022-02-03HR08_evid0005.csv')

# Get the seismic data
seismic_data = df.iloc[:, 1].values  # Assuming the seismic data is in the second column

# Create a time array (assuming the data is sampled at 1 ms intervals)
time = np.arange(len(seismic_data)) / 1000  # Convert to seconds

# Plot the seismic data
plt.figure(figsize=(12, 6))
plt.plot(time, seismic_data)
plt.xlabel('Time (s)')
plt.ylabel('Amplitude')
plt.title('Seismic Data from Mars')
plt.grid(True)
plt.show()