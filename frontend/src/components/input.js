import React from 'react';
import Input from '@mui/joy/Input';

const LocationInput = ({ value, onChange, placeholder }) => {
  return (
    <Input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      sx={{
        backgroundColor: '#333333',
        color: '#ffffff',
        border: '2px solid #007BFF',
        borderRadius: '12px',
        padding: '10px',
        transition: 'all 0.3s ease',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        '&:hover': {
          borderColor: '#0056b3',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        },
        '&:focus-within': {
          borderColor: '#0056b3',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        },
        '&::placeholder': {
          color: '#bbbbbb',
        },
      }}
    />
  );
};

export default LocationInput;
