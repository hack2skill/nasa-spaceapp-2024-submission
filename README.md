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
