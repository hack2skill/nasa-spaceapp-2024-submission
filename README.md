# NASA Space Apps Challenge 2024 [Noida]

#### Team Name - Codee
#### Problem Statement - Landsat Reflectance Data
#### Team Leader Email -wjsuntha@gmail.com

## A Brief of the Prototype:
Our solution offers real-time access to Landsat satellite reflectance data, aimed at applications like agriculture, environmental monitoring, and urban planning. It integrates a Flask backend to process satellite data and a React frontend for visualization.

How it Works:
Data Processing: The backend processes Landsat reflectance data dynamically, preparing it for visualization.
Visualization: The frontend displays this data on an interactive Leaflet.js map, highlighting the relevant geographical area, along with a Plotly.js graph that visualizes the reflectance values for easy analysis.
Seamless Interaction: Users can interact with the data visually through a simple interface, making satellite data accessible for non-experts in real-time.

## Code Execution Instruction:
Clone the Repository:
Clone the project repository from GitHub to your local machine:
bash
Copy code
git clone <repository-url>
Setting up the Backend (Flask):

Navigate to the backend directory:
bash
Copy code
cd backend
Create a virtual environment:
bash
Copy code
python -m venv venv
Activate the virtual environment:
For Windows:
bash
Copy code
venv\Scripts\activate
For Mac/Linux:
bash
Copy code
source venv/bin/activate
Install required Python packages:
bash
Copy code
pip install -r requirements.txt
Run the Flask server:
bash
Copy code
flask run
Setting up the Frontend (React):

Navigate to the frontend directory:
bash
Copy code
cd frontend
Install dependencies:
bash
Copy code
npm install
Start the React development server:
bash
Copy code
npm start
Access the Application:

The React frontend will be available at: http://localhost:3000
The Flask backend will be running at: http://localhost:5000
Testing the Application:

Open the frontend in your browser, click the "Fetch Data" button to visualize the reflectance data on the map and chart.
  *[If your solution is **not** application based, you can ignore this para]
  
 *The Repository must contain your **Execution Plan PDF**.
