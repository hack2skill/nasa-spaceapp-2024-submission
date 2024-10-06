from rest_framework import viewsets
from rest_framework.response import Response
from .models import Location
from .serializers import LocationSerializer
import requests
import ee
from django.contrib import admin
import requests
from skyfield.api import load, Topos
from datetime import datetime, timedelta, timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .tasks import send_email_notification, send_sms_notification
from datetime import datetime, timedelta, timezone



class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

    def create(self, request, *args, **kwargs):
        data = request.data

        # Handle place name
        if 'place_name' in data:
            if (data.get('latitude') is None or data.get('longitude') is None):
                geocode_url = f"https://nominatim.openstreetmap.org/search?q={data['place_name']}&format=json"
                response = requests.get(geocode_url)
                if response.status_code == 200 and len(response.json()) > 0:
                    geo_data = response.json()[0]
                    data['latitude'] = geo_data['lat']
                    data['longitude'] = geo_data['lon']
                else:
                    return Response({"error": "Invalid place name"}, status=400)

        # Handle latitude and longitude directly
        elif (data.get('latitude') is not None and data.get('longitude') is not None):
            # If latitude and longitude are present, no further action is needed
            pass

        # Check for valid input
        elif 'place_name' not in data and (data.get('latitude') is None or data.get('longitude') is None):
            return Response({"error": "Please provide either place_name or both latitude and longitude"}, status=400)

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data)

class LocationAdmin(admin.ModelAdmin):
    list_display = ('place_name', 'latitude', 'longitude')
    search_fields = ('place_name',)
    list_filter = ('latitude', 'longitude')
    ordering = ('place_name',)
    readonly_fields = ('latitude', 'longitude')

class LandsatDataViewSet(viewsets.ViewSet):

    def list(self, request):
        location_id = request.query_params.get('location')
        location = Location.objects.get(id=location_id)

        # Get the latitude and longitude of the user-defined location
        lat = location.latitude
        lon = location.longitude

        # Define the area of interest (3x3 pixel grid around the central point)
        pixel_radius = 0.0003  # Approximate size for 3x3 grid at Landsat resolution
        region = ee.Geometry.Rectangle(
            [lon - pixel_radius, lat - pixel_radius, lon + pixel_radius, lat + pixel_radius]
        )

        # Fetch Landsat 8 Surface Reflectance data for the location
        landsat_collection = ee.ImageCollection("LANDSAT/LC08/C01/T1_SR") \
            .filterBounds(region) \
            .filterDate('2023-01-01', '2023-12-31') \
            .sort('CLOUD_COVER') \
            .first()

        # Select the relevant bands (e.g., B4: Red, B5: Near Infrared)
        bands = landsat_collection.select(['B4', 'B5'])

        # Sample the data at the defined grid
        pixel_data = bands.sample(region, scale=30).getInfo()

        # Extract the data from the GEE response
        landsat_grid = []
        for feature in pixel_data['features']:
            lat_lon = feature['geometry']['coordinates']
            sr_value = feature['properties']['B4']  # Surface Reflectance value for band 4 (example)
            landsat_grid.append({
                "lat": lat_lon[1],
                "lon": lat_lon[0],
                "sr_value": sr_value
            })

        return Response({"grid": landsat_grid})



from skyfield.api import load, Topos
from datetime import datetime, timedelta, timezone
import requests
from rest_framework import status
from rest_framework.response import Response
from rest_framework import viewsets
from .models import Location

# class OverpassViewSet(viewsets.ViewSet):
#     def list(self, request):
#         location_id = request.query_params.get('location')
#         try:
#             location = Location.objects.get(id=location_id)
#         except Location.DoesNotExist:
#             return Response({"error": "Location not found"}, status=status.HTTP_404_NOT_FOUND)

#         lat = location.latitude
#         lon = location.longitude

#         # Step 1: Fetch TLE data from CelesTrak
#         tle_url = f"https://celestrak.com/NORAD/elements/gp.php?CATNR=39084"
#         response = requests.get(tle_url)

#         if response.status_code != 200:
#             return Response({"error": "Unable to retrieve TLE data"}, status_code=status.HTTP_400_BAD_REQUEST)

#         tle_lines = response.text.splitlines()
#         if len(tle_lines) < 2:
#             return Response({"error": "Invalid TLE data received"}, status_code=status.HTTP_400_BAD_REQUEST)

#         # Step 2: Use Skyfield to calculate the next overpass time
#         tle_data = "\n".join(tle_lines)  # Joining TLE lines into a single string

#         # Use load.tle instead of load.tle_file
#         satellite = load.tle(tle_data)  # Loading TLE data correctly
#         ts = load.timescale()
#         observer_location = Topos(latitude_degrees=lat, longitude_degrees=lon)

#         # Step 3: Calculate the next overpass within a 24-hour window
#         start_time = datetime.now(timezone.utc)
#         end_time = start_time + timedelta(days=1)
#         t0 = ts.utc(start_time.year, start_time.month, start_time.day, start_time.hour, start_time.minute)
#         t1 = ts.utc(end_time.year, end_time.month, end_time.day, end_time.hour, end_time.minute)

#         # Step 4: Determine satellite passes
#         time, events = satellite.find_events(observer_location, t0, t1, altitude_degrees=30.0)

#         # Get the next overpass time
#         for ti, event in zip(time, events):
#             if event == 0:  # 0 indicates rise event (when satellite becomes visible)
#                 overpass_time = ti.utc_iso()
#                 return Response({"overpass_time": overpass_time})

#         return Response({"error": "No overpass found in the next 24 hours"}, status=status.HTTP_404_NOT_FOUND)


from rest_framework import status, viewsets
from rest_framework.response import Response
from .models import Location
from skyfield.api import load, Topos
import requests
from datetime import datetime, timedelta, timezone

class OverpassViewSet(viewsets.ViewSet):
    def list(self, request):
        location_id = request.query_params.get('location')
        try:
            location = Location.objects.get(id=location_id)
        except Location.DoesNotExist:
            return Response({"error": "Location not found"}, status=status.HTTP_404_NOT_FOUND)

        lat = location.latitude
        lon = location.longitude

        # Step 1: Fetch TLE data from CelesTrak
        tle_url = "https://celestrak.com/NORAD/elements/gp.php?CATNR=39084"  # Landsat 8 NORAD ID
        response = requests.get(tle_url)

        if response.status_code != 200:
            return Response({"error": "Unable to retrieve TLE data"}, status=status.HTTP_400_BAD_REQUEST)

        tle_lines = response.text.strip().splitlines()
        if len(tle_lines) < 3:  # Ensure at least 3 lines for a valid TLE
            return Response({"error": "Invalid TLE data received"}, status=status.HTTP_400_BAD_REQUEST)

        # Clean up TLE lines and remove leading/trailing whitespace
        tle_lines = [line.strip() for line in tle_lines]
        
        # Debugging output to check TLE lines
        print("TLE Lines:")
        for line in tle_lines:
            print(f"'{line}'")  # Print each line with quotes to identify whitespace

        # Step 2: Use Skyfield to calculate the next overpass time
        try:
            # Use load.tle_file with properly formatted TLE lines
            satellites = load.tle_file('\n'.join(tle_lines))
            satellite = satellites[0]  # Get the first satellite from the loaded TLE lines
        except Exception as e:
            return Response({"error": f"Error loading satellite: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)

        ts = load.timescale()
        observer_location = Topos(latitude_degrees=lat, longitude_degrees=lon)

        # Step 3: Calculate the next overpass within a 24-hour window
        start_time = datetime.now(timezone.utc)
        end_time = start_time + timedelta(days=1)
        t0 = ts.utc(start_time.year, start_time.month, start_time.day, start_time.hour, start_time.minute)
        t1 = ts.utc(end_time.year, end_time.month, end_time.day, end_time.hour, end_time.minute)

        # Step 4: Determine satellite passes
        time, events = satellite.find_events(observer_location, t0, t1, altitude_degrees=30.0)

        # Get the next overpass time
        for ti, event in zip(time, events):
            if event == 0:  # 0 indicates rise event (when satellite becomes visible)
                overpass_time = ti.utc_iso()
                return Response({"overpass_time": overpass_time})

        return Response({"error": "No overpass found in the next 24 hours"}, status=status.HTTP_404_NOT_FOUND)



class NotificationViewSet(viewsets.ViewSet):
    def create(self, request):
        location_id = request.data.get('location')
        email = request.data.get('email')
        phone_number = request.data.get('phone_number')
        lead_time = int(request.data.get('lead_time', 60))  # lead time in minutes

        location = get_object_or_404(Location, id=location_id)

        # Mock overpass time (in a real scenario, calculate or fetch overpass time)
        overpass_time_str = "2024-10-12T14:55:00Z"
        overpass_time = datetime.strptime(overpass_time_str, "%Y-%m-%dT%H:%M:%SZ")

        # Schedule time = Overpass time - Lead time
        notification_time = overpass_time - timedelta(minutes=lead_time)
        countdown = (notification_time - datetime.now(timezone.utc)).total_seconds()

        if countdown > 0:
            if email:
                send_email_notification.apply_async((email, overpass_time_str), countdown=countdown)
            if phone_number:
                send_sms_notification.apply_async((phone_number, overpass_time_str), countdown=countdown)
            return Response({"message": "Notification scheduled."})
        else:
            return Response({"error": "Lead time is too short; overpass has already occurred or is too soon."}, status=400)
