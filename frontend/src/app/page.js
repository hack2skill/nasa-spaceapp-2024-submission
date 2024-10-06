"use client"
import React, { useState, useEffect } from 'react';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import axios from 'axios';
import LocationInput from '@/components/input';
import Grid from '@mui/joy/Grid';
import Box from '@mui/joy/Box';

const Home = () => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [images, setImages] = useState([]);

  const handleSubmit = async () => {
    if (!latitude || !longitude) {
      alert('Please enter both latitude and longitude.');
      return;
    }

    const data = {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    };

    try {
      const response = await axios.post('/api/location', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        alert('Location submitted successfully');
        // Optionally: You could also fetch the images here after submitting the location
      } else {
        alert('Failed to submit location');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting location');
    }
  };

  // Fetch images from the backend on component mount
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('/api/images'); // Replace with your actual endpoint
        if (response.status === 200) {
          setImages(response.data); // Assuming the response contains an array of image URLs
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <Stack spacing={3} sx={{ width: '350px', margin: 'auto', paddingTop: '20px' }}>
      <Typography level="h5" textAlign="center">Enter Location</Typography>

      <LocationInput
        value={latitude}
        onChange={(e) => setLatitude(e.target.value)}
        placeholder="Enter Latitude"
      />
      <LocationInput
        value={longitude}
        onChange={(e) => setLongitude(e.target.value)}
        placeholder="Enter Longitude"
      />

      <Button onClick={handleSubmit} variant="solid" color="primary">
        Submit
      </Button>

      {/* Image Grid */}
      <Box sx={{ paddingTop: '20px' }}>
        <Typography level="h6" textAlign="center">Fetched Images</Typography>
        <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
          {images.map((image, index) => (
            <Grid item xs={4} key={index}>
              <img 
                src={image} 
                alt={`Image ${index + 1}`} 
                style={{ width: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }} 
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Stack>
  );
};

export default Home;
