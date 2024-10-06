const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors')
const axios = require('axios');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const NASA_API_BASE = 'https://api.nasa.gov/neo/rest/v1/neo/browse';
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const cache = {
    data: new Map(),
    timeout: 300000
};

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

const fetchCoordinates = async (city) => {
    const geocodeApiUrl = `https://api.opencagedata.com/geocode/v1/json`;
    const response = await axios.get(geocodeApiUrl, {
      params: {
        q: city,
        key: process.env.OPENCAGE_API_KEY
      }
    });
    
    if (response.data && response.data.results.length > 0) {
      const { lat, lng } = response.data.results[0].geometry;
      return { lat, lon: lng };
    } else {
      throw new Error('City not found');
    }
  };

const fetchSatelliteData = async (lat, lon) => {
  const nasaApiUrl = `https://api.nasa.gov/planetary/earth/assets`;
  const response = await axios.get(nasaApiUrl, {
    params: {
      lon,
      lat,
      dim: 0.025, //11 kms
      date: '2021-09-01',
      api_key: process.env.NASA_API_KEY
    }
  })
  return response.data;
};

const fetchPollutionData = async (lat, lon) => {
    const response = await axios.get('https://api.openaq.org/v2/latest', {
      params: {
        coordinates: `${lat},${lon}`,
        radius: 2750,
        limit: 1
      },
      headers: {
        'X-API-Key': process.env.OPENAQ_API_KEY
      }
    });
    return response.data;
};  

async function fetchWeatherDataWithRetry(lat, lon, retries = 3) {
    const cacheKey = `${lat}-${lon}`;
    
    if (cache.data.has(cacheKey) && 
        Date.now() - cache.data.get(cacheKey).timestamp < cache.timeout) {
        return cache.data.get(cacheKey).data;
    }

    try {
        const response = await axios.get(WEATHER_BASE_URL, {
            params: {
                lat,
                lon,
                appid: OPENWEATHER_API_KEY,
                units: 'metric'
            }
        });

        const result = response.data;
        cache.data.set(cacheKey, {
            data: result,
            timestamp: Date.now()
        });

        return result;
    } catch (error) {
        if (retries > 0 && error.response?.status === 429) {
            await delay(1000);
            return fetchWeatherDataWithRetry(lat, lon, retries - 1);
        }
        throw error;
    }
}

function generatePoints(bounds, count) {
    const [minLng, minLat, maxLng, maxLat] = bounds;
    const points = [];
    
    const aspectRatio = (maxLng - minLng) / (maxLat - minLat);
    const rowCount = Math.floor(Math.sqrt(count / aspectRatio));
    const colCount = Math.floor(count / rowCount);
    
    const latStep = (maxLat - minLat) / rowCount;
    const lngStep = (maxLng - minLng) / colCount;
    
    for (let lat = minLat; lat <= maxLat; lat += latStep) {
        for (let lng = minLng; lng <= maxLng; lng += lngStep) {
            points.push({
                latitude: parseFloat(lat.toFixed(6)),
                longitude: parseFloat(lng.toFixed(6))
            });
        }
    }
    
    return points;
}

app.get('/api/satellite-data', async (req, res) => {
    try {
        const response = await axios.get(`${NASA_API_BASE}?api_key=${process.env.NASA_API_KEY}`);
        const satelliteData = response.data.near_earth_objects;

        const mappedData = satelliteData.map((satellite) => ({
            name: satellite.name,
            nasa_jpl_url: satellite.nasa_jpl_url,
            is_potentially_hazardous: satellite.is_potentially_hazardous_asteroid,
            close_approach_data: satellite.close_approach_data,
        }));

        res.json(mappedData);
    } catch (error) {
        console.error('Error fetching satellite data:', error);
        res.status(500).json({ error: 'Error fetching data from NASA API' });
    }
});

app.get('/api/heatmap', async (req, res) => {
    try {
        const { bounds, parameter = 'temperature' } = req.query;
        
        if (!bounds) {
            return res.status(400).json({
                error: 'Missing required parameter: bounds'
            });
        }

        const boundsArray = JSON.parse(bounds);
        
        const points = generatePoints(boundsArray, 50);
        
        const batchSize = 5;
        const heatmapData = [];
        
        for (let i = 0; i < points.length; i += batchSize) {
            const batch = points.slice(i, i + batchSize);
            
            const batchResults = await Promise.all(
                batch.map(async (point, index) => {
                    try {
                        await delay(index * 200);
                        
                        const weatherData = await fetchWeatherDataWithRetry(
                            point.latitude,
                            point.longitude
                        );

                        let value;
                        switch (parameter) {
                            case 'temperature':
                                value = weatherData.main.temp;
                                break;
                            case 'humidity':
                                value = weatherData.main.humidity;
                                break;
                            case 'windSpeed':
                                value = weatherData.wind.speed;
                                break;
                            case 'cloudCover':
                                value = weatherData.clouds.all;
                                break;
                            case 'pressure':
                                value = weatherData.main.pressure;
                                break;
                            default:
                                value = weatherData.main.temp;
                        }

                        return {
                            coordinates: [point.longitude, point.latitude],
                            value: value,
                            metadata: {
                                location: weatherData.name,
                                description: weatherData.weather[0].description
                            }
                        };
                    } catch (error) {
                        console.error(`Error fetching data for point ${point.latitude},${point.longitude}:`, error);
                        return null;
                    }
                })
            );
            
            heatmapData.push(...batchResults.filter(result => result !== null));
            
            await delay(1000);
        }

        res.json({
            parameter,
            points: heatmapData,
            metadata: {
                bounds: boundsArray,
                pointCount: heatmapData.length,
                timestamp: new Date().toISOString(),
                parameterUnit: getParameterUnit(parameter)
            }
        });

    } catch (error) {
        console.error('Heatmap generation error:', error);
        res.status(400).json({
            error: error.message || 'Error generating heatmap data'
        });
    }
});

function getParameterUnit(parameter) {
    switch (parameter) {
        case 'temperature':
            return '°C';
        case 'humidity':
            return '%';
        case 'windSpeed':
            return 'm/s';
        case 'cloudCover':
            return '%';
        case 'pressure':
            return 'hPa';
        default:
            return '';
    }
}

app.get('/api/city-data', async (req, res) => {
    const { city } = req.query;
  
    try {

      const { lat, lon } = await fetchCoordinates(city).catch(err => {
        throw new Error('Error fetching coordinates');
      });
  
      const satelliteData = await fetchSatelliteData(lat, lon).catch(err => {
        throw new Error('Error fetching satellite data');
      });
  
      const pollutionData = await fetchPollutionData(lat, lon).catch(err => {
        throw new Error('Error fetching pollution data');
      });
  
      res.status(200).json({ satelliteData, pollutionData });
  
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

app.listen(PORT, () => {
    console.log('Server running on port 3000');
});