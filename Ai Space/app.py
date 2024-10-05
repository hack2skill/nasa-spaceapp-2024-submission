import matplotlib
matplotlib.use('Agg')  # Use the Agg backend for non-GUI plotting

from flask import Flask, request, render_template
import cv2
import numpy as np
import matplotlib.pyplot as plt
from sklearn.preprocessing import MinMaxScaler
import requests
import os

app = Flask(__name__)

# Paths to save images and graphs
PROCESSED_IMAGE_PATH = 'static/processed_image.png'
ORIGINAL_IMAGE_PATH = 'static/original_image.png'
HEATMAP_IMAGE_PATH = 'static/heatmap_image.png'
LANDING_SPOT_MAP_PATH = 'static/landing_spot_map.png'
SPEED_ALTITUDE_GRAPH_PATH = 'static/speed_altitude_graph.png'

# Ensure necessary folders exist
if not os.path.exists('static'):
    os.makedirs('static')

# Load image from a file
def load_image_from_file(file):
    file_content = file.read()
    image = cv2.imdecode(np.frombuffer(file_content, np.uint8), cv2.IMREAD_GRAYSCALE)
    image = cv2.resize(image, (512, 512))  # Resize for consistency
    return image

# Load image from a URL
def load_image_from_url(url):
    response = requests.get(url)
    image = cv2.imdecode(np.frombuffer(response.content, np.uint8), cv2.IMREAD_GRAYSCALE)
    image = cv2.resize(image, (512, 512))  # Resize for consistency
    return image

# Estimate altitude based on image intensity
def estimate_altitude(image):
    mean_intensity = np.mean(image)
    altitude = mean_intensity * 100  # Simple linear mapping; adjust as needed
    return altitude

# Calculate required thrust
def calculate_required_thrust(altitude, lander_mass=1000):
    gravity = 1.62  # Lunar gravity in m/s^2
    required_thrust = lander_mass * gravity * (1 + altitude / 1000)
    return required_thrust

# Preprocess image (normalization)
def preprocess_image(image):
    scaler = MinMaxScaler()
    image_flattened = image.astype(np.float32).reshape(-1, 1)  # Convert to float32
    image_normalized = scaler.fit_transform(image_flattened).reshape(image.shape)
    return image_normalized

# Find best landing spots and generate heatmap
def find_best_spots(image, altitude):
    heatmap = np.zeros_like(image, dtype=np.float32)  # Use float32 for better precision
    spots = []

    step_size = 64
    window_size = 128
    
    for y in range(0, image.shape[0] - window_size + 1, step_size):
        for x in range(0, image.shape[1] - window_size + 1, step_size):
            window = image[y:y + window_size, x:x + window_size]
            mean_brightness = np.mean(window)
            std_dev = np.std(window)
            
            score = 1 / (std_dev + 1) * (1 - abs(mean_brightness - altitude / 100))
            heatmap[y:y + window_size, x:x + window_size] = score
            spots.append((score, (x, y)))

    heatmap = np.interp(heatmap, (heatmap.min(), heatmap.max()), (0, 255))
    heatmap = np.uint8(heatmap)  # Convert to uint8 for better visualization
    spots.sort(reverse=True, key=lambda s: s[0])
    best_spots = spots[:3]
    
    return heatmap, best_spots

# Mark best landing spots on the image
def mark_spots_on_image(image, best_spots):
    marked_image = cv2.cvtColor(image, cv2.COLOR_GRAY2BGR)
    labels = ["Spot 1", "Spot 2", "Spot 3"]
    colors = [(0, 255, 0), (255, 255, 0), (0, 0, 255)]  # Green, Yellow, Red
    radius = 10  # Small radius for circles

    for i, (score, (x, y)) in enumerate(best_spots):
        center = (x, y)  # Coordinates are already in the original image space
        cv2.circle(marked_image, center, radius, colors[i], 2)  # Draw circle
        cv2.putText(marked_image, f"{labels[i]}: {score:.2f}", (x - 10, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, colors[i], 2)
    
    return marked_image

# Save images to disk
def save_images(original_image, heatmap_image, landing_spot_map):
    cv2.imwrite(ORIGINAL_IMAGE_PATH, original_image)
    cv2.imwrite(HEATMAP_IMAGE_PATH, heatmap_image)
    cv2.imwrite(LANDING_SPOT_MAP_PATH, landing_spot_map)

# Generate speed vs altitude graph
def generate_speed_vs_altitude_graph(altitude):
    try:
        altitudes = np.linspace(0, altitude, 100)
        speeds = np.sqrt(2 * 1.62 * altitudes)  # Free-fall speed calculation

        plt.figure(figsize=(8, 6))
        plt.plot(altitudes, speeds, color='orange', label='Speed')
        plt.title('Speed vs. Altitude for Bottom Thruster')
        plt.xlabel('Altitude (m)')
        plt.ylabel('Speed (m/s)')
        plt.legend()
        plt.grid(True)
        plt.savefig(SPEED_ALTITUDE_GRAPH_PATH)
        plt.close()
    except Exception as e:
        print(f"Error generating Speed vs. Altitude graph: {e}")

# Index page
@app.route('/')
def index():
    return render_template('index.html')

# File upload endpoint
@app.route('/upload', methods=['POST'])
def upload_file():
    file = request.files.get('file')
    url = request.form.get('url')
    
    if file:
        image = load_image_from_file(file)
    elif url:
        image = load_image_from_url(url)
    else:
        return "No file or URL provided", 400

    try:
        altitude = estimate_altitude(image)
        required_thrust = calculate_required_thrust(altitude)
        
        processed_image = preprocess_image(image)
        heatmap, best_spots = find_best_spots(processed_image, altitude)
        marked_image = mark_spots_on_image(image, best_spots)  # Marking on the original image
        
        generate_speed_vs_altitude_graph(altitude)
        
        save_images(image, heatmap, marked_image)

        # Directly render the results template with all data
        return render_template('results.html', altitude=altitude,
                               required_thrust=required_thrust, 
                               heatmap_image=HEATMAP_IMAGE_PATH,
                               landing_spot_map=LANDING_SPOT_MAP_PATH,
                               speed_altitude_graph=SPEED_ALTITUDE_GRAPH_PATH)
    except Exception as e:
        return str(e), 500

# Render the results page
@app.route('/results')
def results():
    return render_template('results.html')

if __name__ == '__main__':
    app.run(debug=True)
