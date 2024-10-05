import pandas as pd
import matplotlib.pyplot as plt

df1 = pd.read_csv('./XB.ELYSE.02.BHV.2022-01-02HR04_evid0006.csv') 
df2 = pd.read_csv('./XB.ELYSE.02.BHV.2022-02-03HR08_evid0005.csv')

threshold = 0.1/100

df1_filtered = df1[df1['velocity(c/s)'] >= threshold]
df2_filtered = df2[df2['velocity(c/s)'] >= threshold]

plt.figure(figsize=(10, 6))

plt.plot(df1_filtered['rel_time(sec)'], df1_filtered['velocity(c/s)'], label='Dataset 1 (Filtered)', color='b', marker='o')
plt.plot(df2_filtered['rel_time(sec)'], df2_filtered['velocity(c/s)'], label='Dataset 2 (Filtered)', color='g', marker='x')

plt.title('Filtered Velocity vs. Relative Time', fontsize=16)
plt.xlabel('Relative Time (seconds)', fontsize=12)
plt.ylabel('Velocity (c/s)', fontsize=12)

plt.legend()

plt.grid(True)
plt.show()