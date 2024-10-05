# NASA Space Apps Challenge 2024 [Noida]

#### Team Name - Omniscient
#### Problem Statement - Create Your Own Challenge
#### Team Leader Email - usaraids2023@gmail.com
#### Github Email - mayank.091827@gmail.com

## A Brief of the Prototype:
  1.Real-Time Anomaly Detection-AI continuously
monitors spacecraft sensor data, instantly detecting
anomalies like communication delays during missions.
2.Predictive Maintenance and Health Monitoring- AI
predicts system health, anticipating future failures and
recommending timely interventions, reducing downtime
and enhancing mission success.
3.Autonomous Decision-Making Support- In
emergencies, AI-driven systems suggest corrective
actions in real-time, assisting mission control in critical
decision-making.
4.Adaptive Mission Planning- AI dynamically adjusts
mission parameters like orbit correction and resource
allocation, proposing adaptive strategies based on
environmental changes.

## Code Execution Instruction:
  First It will take photoes while landing on the planet or moon and automatically it detects whether the position it ahd to land is safe or not. If it is not safe then it will cahnge its path.
  1)It will take images continueously and detect the present condition there. 
like landing spot .
2)then it converts the image into heatmap 
3)then it detects the best landing sites there.
  
 *The Repository must contain your **Execution Plan PDF**.

# Space AI 🚀

## Overview 🌌
Space AI is a web application that analyzes images to identify optimal landing spots on lunar surfaces. By leveraging image processing techniques, the application estimates altitude, calculates required thrust, and identifies the best landing spots. Users can upload an image or provide a URL to an image, and the application will process it to provide detailed analysis results.

## Features 🌟
- **Image Upload and URL Input:** Upload an image file or provide a URL to analyze lunar landing spots.
- **Altitude Estimation:** Estimate the altitude based on image pixel intensity.
- **Thrust Calculation:** Calculate the required thrust for a lunar lander based on the estimated altitude.
- **Landing Spot Identification:** Identify and mark the top three landing spots based on image analysis.
- **Processed Image Display:** Display the processed image with marked landing spots.

## Technologies Used ⚙️
- **Flask:** Web framework for building the application.
- **OpenCV:** Image processing library for handling image operations.
- **NumPy:** Numerical operations library for image manipulation.
- **Scikit-learn:** For normalization of image data.
- **Requests:** For handling image downloads from URLs.

## Setup and Installation 🛠️

### Prerequisites:
- `Python 3.x`
- `Flask`
- `OpenCV`
- `NumPy`
- `Scikit-learn`
- `Requests`

## File Structure 📂
- `app.py`: Main Flask application file.
- `templates/`: Contains HTML templates for the application.
  - `index.html`: Form for image upload and URL input.
  - `result.html`: Page displaying analysis results.
- `static/`: Contains static files such as CSS and images.
- `requirements.txt`: Python dependencies for the project.

## Troubleshooting 🛠️
- **Image Not Found:** Ensure that the image path in the `PROCESSED_IMAGE_PATH` is correct and accessible.
- **Dependencies:** Ensure all required packages are installed correctly.
- **Server Errors:** Check the Flask server logs for detailed error messages.

## License 📜
This project is licensed under the MIT License. See the `LICENSE` file for details.
