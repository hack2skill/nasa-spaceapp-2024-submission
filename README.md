# NASA Space Apps Challenge 2024 [Noida]

#### Team Name - Tech Conqueror
#### Problem Statement - Landsat Reflectance Data: On the Fly and at Your
Fingertips
#### Team Leader Email - eeshuyadav123@gmail.com


#### Solution Overview
Our solution is a satellite overpass notification and data retrieval platform focused on Landsat imagery. Designed for users needing timely and precise satellite-based surface reflectance data, this prototype aims to simplify satellite imagery access and enhance environmental monitoring, research, and planning applications. The solution allows users to specify a target location, check upcoming Landsat satellite overpass times, and view a 3x3 grid of Landsat pixels centered on that location. Additionally, users can set notifications to alert them before an overpass, and the platform provides options to receive alerts via email or SMS. This system brings the power of satellite observation directly to users in real-time, aiding anyone from environmental scientists to policymakers in making data-driven decisions based on timely satellite imagery.

The platform consists of three core components:

Target Location and Overpass Notification Setup
Real-time Landsat Pixel Data Retrieval
Automated Notifications
### How it Works
#### 1. Target Location and Overpass Notification Setup
Users begin by selecting or inputting a target location. This input can be a latitude/longitude coordinate or a direct selection on an interactive map. Once the location is set, our platform determines when the next Landsat satellite will pass over the area by querying services such as the CelesTrak API. CelesTrak provides orbital parameters that can be used to predict satellite positions, enabling us to determine overpass times based on user-defined coordinates. With the overpass time calculated, users can set lead times (e.g., 1 day, 1 hour) before the satellite's expected arrival and choose their preferred notification method, either email or SMS.

#### 2. Real-time Landsat Pixel Data Retrieval
The platform uses Google Earth Engine (GEE) or the USGS Earth Explorer API to fetch satellite imagery data from Landsat satellites. A 3x3 grid centered around the user-defined location is displayed, where each grid cell represents a Landsat pixel. This feature allows users to inspect nearby pixels and understand the local variations in surface reflectance. The grid data includes spectral reflectance values across multiple bands, and if available, surface temperature information derived from thermal infrared bands. This high-resolution, real-time grid visualization assists users in gaining insight into the spatial distribution of reflectance data in their area of interest.

The retrieval of Landsat data considers user-set parameters, such as cloud cover threshold and acquisition time range, ensuring that the data is relevant and high-quality. Users can opt for recent acquisitions or specify a time range for historical data, allowing for a flexible analysis suited to their needs.

#### 3. Automated Notifications
Upon setting a notification, Celery, a background task manager, schedules the notifications based on the user-defined lead time. Celery works in conjunction with Redis, a message broker, to ensure task reliability and timely notifications. Users are notified by their chosen method, either via email (using SendGrid) or SMS (using Twilio). Email notifications include the exact overpass time, while SMS notifications are sent in advance of the overpass as per the lead time preference. This ensures users are prepared to capture or analyze data as the satellite passes.

By providing an intuitive interface for tracking satellite imagery overpasses and automating data notifications, this solution bridges the gap between remote sensing data accessibility and real-time field application. This capability is particularly valuable for environmental researchers, agriculturalists, and climate scientists who rely on up-to-date, reliable, and precise data to make informed decisions. Our platform enables easier satellite data access while supporting accurate and timely analysis, making it a robust tool for a range of geospatial and environmental monitoring applications.





Execution Plan for Satellite Overpass Notification and Data Retrieval Platform
1. Repository Setup
Clone the Repository

bash
Copy code
git clone <repository-url>
cd <repository-directory>
Check Directory Structure
Ensure the repository has the following structure for smooth setup:

arduino
Copy code
├── project_folder/
│   ├── settings.py
│   ├── urls.py
│   ├── views.py
│   ├── tasks.py
│   ├── models.py
├── templates/
├── static/
├── Execution_Plan.pdf
├── requirements.txt
├── README.md
├── ...
2. Python Environment Setup
Set up a Python Virtual Environment

bash
Copy code
python3 -m venv myenv
source myenv/bin/activate  # For Windows: myenv\Scripts\activate
Install Requirements
Install all dependencies:

bash
Copy code
pip install -r requirements.txt
3. Configure Celery and Redis for Background Tasks
Install Redis (if not already installed)
Follow instructions on Redis’s official website to install Redis on your system.

Start Redis Server

bash
Copy code
redis-server
Configure Celery in Django
Ensure that celery.py is configured correctly with Redis as the broker:

python
Copy code
# In celery.py
app.conf.broker_url = 'redis://localhost:6379/0'
app.conf.result_backend = 'redis://localhost:6379/0'
Run Celery Worker
Open a new terminal and start the Celery worker:

bash
Copy code
celery -A project_folder worker -l info
4. Configure Email and SMS Services
Email Setup (SendGrid or SMTP)
Configure email settings in settings.py:

python
Copy code
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.sendgrid.net'  # or your SMTP provider
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = '<sendgrid_username>'
EMAIL_HOST_PASSWORD = '<sendgrid_password>'
SMS Setup (Twilio)
Add your Twilio account credentials to settings.py:

python
Copy code
TWILIO_ACCOUNT_SID = '<your_account_sid>'
TWILIO_AUTH_TOKEN = '<your_auth_token>'
TWILIO_PHONE_NUMBER = '<twilio_phone_number>'
5. Database Setup
Set up PostgreSQL Database
Create a PostgreSQL database and user, then add the database configurations in settings.py:

python
Copy code
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'your_db_name',
        'USER': 'your_db_user',
        'PASSWORD': 'your_db_password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
Run Migrations

bash
Copy code
python manage.py makemigrations
python manage.py migrate
6. Run Django Server
Start Development Server

bash
Copy code
python manage.py runserver
Access the Application
Open your browser and go to http://localhost:8000 to view the application.

7. Testing the Application
Set Up Test Data
Add initial data, including sample locations, by using the Django admin interface or through fixtures.

Test Notification Scheduling

Access the overpass time scheduling view.
Verify that notifications are scheduled and sent correctly according to lead times.
Verify Landsat Data Retrieval
Test the data retrieval views and ensure the 3x3 Landsat grid is fetched and displayed correctly.



