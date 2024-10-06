# NASA Space Apps Challenge 2024 [Noida]

## Team Name
Cosmic Chakra

## Problem Statement
Seismic Detection Across the Solar System

## Team Leader Email
[malavika2gupta@gmail.com]

## A Brief of the Prototype
This project focuses on optimizing the transmission of seismic data from planetary missions by implementing on-board processing and event detection. By reducing the volume of transmitted data, the prototype aims to conserve energy and extend the lifespan of planetary missions. Currently, a prototype has been developed using Mars InSight seismic data and lunar seismic data, with a Random Forest model achieving high accuracy in distinguishing significant seismic events from noise.

### What is your solution and how does it work?
Our solution employs preprocessing techniques on seismic data in MiniSEED format, extracting relevant features and labeling seismic traces. A Random Forest classifier is then used to identify important seismic events. The solution aims to process data onboard to minimize the volume sent back to Earth, which helps in energy conservation. Additionally, we plan to integrate data compression and a simulated real-time processing pipeline.

## Code Execution Instruction

Clone the repository and ensure the following dependencies are installed:

- Python 3.8+
- ObsPy
- NumPy
- Pandas
- Scikit-learn

  copygit clone https://github.com/yourusername/Optimized-Seismic-Data-Transmission-NASA-Noida-Space-Apps-2024.git

## Data Processing:

Implemented preprocessing techniques for the MiniSEED files.
Developed a labeling system for seismic traces.
Extracted relevant features from the processed data.


## Contributing
We welcome contributions! Please feel free to submit a Pull Request.
