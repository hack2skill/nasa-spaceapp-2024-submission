import React, { useState } from "react";
import Plot from "react-plotly.js";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./App.css";
import "leaflet/dist/leaflet.css";

function App() {
  const [reflectanceData, setReflectanceData] = useState(null);

  const fetchLandsatData = async () => {
    const response = await fetch("http://127.0.0.1:5000/get_landsat_data");
    const data = await response.json();
    setReflectanceData(data);
  };

  return (
    <div className="App">
      <h1>Landsat Reflectance Data</h1>
      <label>Enter Location:</label>
      <input type="text" placeholder="Latitude, Longitude" />
      <label>Select Time Range:</label>
      <input type="date" /> to <input type="date" />
      <button onClick={fetchLandsatData}>Fetch Data</button>
      {reflectanceData && (
        <div>
          <h2>Reflectance Data</h2>
          <Plot
            data={[
              {
                x: ["Band 1", "Band 2", "Band 3"],
                y: reflectanceData.reflectance,
                type: "bar",
              },
            ]}
            layout={{ title: "Landsat Reflectance Values" }}
          />

          <h2>Map View</h2>
          <MapContainer
            center={[
              reflectanceData.coordinates[0],
              reflectanceData.coordinates[1],
            ]}
            zoom={13}
            style={{ height: "400px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={reflectanceData.coordinates}>
              <Popup>Reflectance Data Location</Popup>
            </Marker>
          </MapContainer>
        </div>
      )}
    </div>
  );
}

export default App;
