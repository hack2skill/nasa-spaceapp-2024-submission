# NASA Space Apps Challenge 2024 [Noida]

#### Team Name - Cosmic Hactivists
#### Problem Statement - 
#### Team Leader Email - aagamcshah172005@gmail.com

# Seismic Signal Analysis System

## A Brief of the Prototype

### What is Your Solution?

**Solution Overview**:
The proposed solution is a **Seismic Signal Analysis System** that processes seismic data to detect significant events using advanced signal processing techniques. The system leverages machine learning algorithms to analyze time-series data, allowing users to identify potential seismic activities accurately.

**How It Works**:
1. **File Upload**: Users can upload CSV files containing seismic data, including time and velocity measurements. The application accepts files with specific formats and checks for necessary data columns.
   
2. **Data Processing**: Upon uploading the file, the backend server (built with Flask) processes the data. The system applies a **bandpass filter** to the velocity data to isolate significant frequency ranges relevant for seismic analysis.

3. **STA/LTA Calculation**: The system computes the **Short-Term Average/Long-Term Average (STA/LTA)** ratio to identify significant events in the seismic data. This technique helps in detecting transient seismic activities against background noise.

4. **Visualization**: After processing, the application generates a plot displaying the filtered velocity data over time, highlighting significant seismic events based on the calculated STA/LTA ratio.

5. **Result Display**: The resulting plot is returned to the user as an image, which they can view and download for further analysis.

---

## Code Execution Instructions
### Step-by-Step Execution Plan

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/your-repository.git
   cd your-repository
Set Up the Backend:

Navigate to the backend directory:
bash

cd backend
Install the required packages:
bash

pip install -r requirements.txt
Start the Flask server:
bash

python app.py
Set Up the Frontend:

Navigate to the frontend directory:
bash

cd ../frontend
Install the required packages:
bash

npm install
Start the React development server:
bash

npm run dev

### Repository Structure


## Code Execution Instruction:
  *[If your solution is **not** application based, you can ignore this para]
  
 *The Repository must contain your **Execution Plan PDF**.
