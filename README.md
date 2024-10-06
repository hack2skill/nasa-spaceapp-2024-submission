# NASA Space Apps Challenge 2024 [Noida]

#### Team Name - Supacode
#### Problem Statement -  Leveraging Earth Observation Data for Informed Agricultural Decision-Making
#### Team Leader Email - goswamikrishna549@gmail.com

## A Brief of the Prototype:
 The project focuses on creating a web-based application designed to empower farmers with valuable insights into water availability, weather patterns, soil moisture, and crop health. Leveraging advanced machine learning models and satellite data, the platform provides actionable intelligence that enables farmers to make informed decisions about their agricultural practices. By integrating data from NASA’s GRACE mission and other relevant sources, the application predicts future water needs and highlights potential risks like droughts or floods. This allows farmers to optimize their irrigation schedules, ensuring efficient water usage while safeguarding crops.

The application also incorporates crop disease prediction using Convolutional Neural Networks (CNN), which helps farmers identify and address issues before they escalate, minimizing crop loss. Additionally, the user-friendly interface ensures that even farmers with limited technical expertise can navigate the platform and benefit from its features. Through real-time monitoring and early alerts, the platform provides timely notifications on soil health, pest threats, and weather-related challenges.

In essence, the application empowers farmers by simplifying access to complex data, making agricultural practices more sustainable, profitable, and resilient in the face of environmental changes. With added features like historical yield analysis and AI-driven recommendations, this tool serves as a comprehensive resource for modern farming.

## Code Execution Instruction:
  ## Installation

### Clone the Repository

bash
git clone https://github.com/Senpai-489/Farmingo.git


## Deployed Website :
# Website URL : "https://farmingofrontend-leq2.vercel.app"

#use 
`Username - admin@gmail.com`
`Password- admin`
## -Running the Application-

### On local machine:
#### 1) Install the packages for Front-End:

bash
cd client
npm i

#### 2) Install the packages for Back-End : 
bash
cd server
npm i

#### 3) Create a .env file in Farmingo/server: 
text
PORT=7600
JWT_KEY = <Add your key>
ORIGIN = "http://localhost:5173"
DATABASE_URL = <Add your Mongo_connection_string>

#### 4) Create a .env file in Farmingo/client: 
- If running on local machine:
text
VITE_SERVER_URL = "http://localhost:7600"
Edit HOST in client/src/utils/constants.js as:
export const HOST = import process.env.metadata.VITE_SERVER_URL

- Else use our backend API: Already set as default in client/src/utils/constants.js
    

#### 5) Run client :
From root directory i.e; Farmingo:
bash
cd client
npm run dev

#### 5) Run server :
From root directory i.e; Farmingo:
bash
cd server
npm run dev


## Your Website is running on local machine





Feel free to reach out if you have any additional requests or questions!
Email: [ goswamikrishna549@gmail.com ]
  
 **Execution Plan PDF** [https://drive.google.com/file/d/1ffSqz_1znAjlgZhYYwEzZJBkatiQVBuM/view?usp=sharing]
