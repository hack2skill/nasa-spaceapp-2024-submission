# Optimized-Seismic-Data-Transmission-NASA-Noida-Space-Apps-2024

Project Overview
This project aims to optimize the transmission of seismic data from planetary missions by implementing on-board processing and event detection. Our goal is to reduce the amount of data transmitted back to Earth, thus conserving energy and extending mission lifespans.
Current Implementation
We've developed a prototype using Mars InSight data to demonstrate the concept. Here's what we've accomplished so far:

Data Source: We're using Mars InSight seismic data in MiniSEED (.mseed) format, covering three days over different time periods.

Data Processing:

Implemented preprocessing techniques for the MiniSEED files.
Developed a labeling system for seismic traces.
Extracted relevant features from the processed data.


Machine Learning Model:

Trained a Random Forest classifier to distinguish between significant seismic events and noise.
Currently achieving 100% accuracy on our limited dataset.



Todo

 Expand the dataset to include more varied seismic events and noise patterns.
 Implement cross-validation to ensure model robustness.
 Develop a simulated real-time processing pipeline.
 Integrate data compression algorithms for efficient transmission.
 Create a mock-up of the on-board system architecture.

Getting Started
Prerequisites

Python 3.8+
ObsPy
NumPy
Pandas
Scikit-learn

Installation

Clone the repository:
Copygit clone https://github.com/yourusername/Optimized-Seismic-Data-Transmission-NASA-Noida-Space-Apps-2024.git

Contributing
We welcome contributions! Please feel free to submit a Pull Request.
