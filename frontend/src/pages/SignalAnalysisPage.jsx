import React, { useState } from 'react';
import axios from 'axios';

const SignalAnalysisPage = () => {
  const [file, setFile] = useState(null);
  const [plotUrl, setPlotUrl] = useState('');

  const handleFileChange = (e) => {
      setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      if (!file) {
          alert('Please upload a file');
          return;
      }

      const formData = new FormData();
      formData.append('file', file);

      try {
          // Call the Flask API to process the file
          const response = await axios.post('http://127.0.0.1:5000/api/process-seismic', formData, {
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
              responseType: 'blob', // Set response type to blob to handle image response
          });

          // Create a URL for the image blob and set it in state
          const imageBlob = new Blob([response.data], { type: 'image/png' });
          const imageUrl = URL.createObjectURL(imageBlob);
          setPlotUrl(imageUrl);
      } catch (error) {
          console.error('Error processing file:', error);
      }
  };

  return (
      <div className="p-4 bg-gray-100 min-h-screen">
          <h1 className="text-2xl font-bold mb-4 text-center">Signal Analysis</h1>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
              <input type="file" onChange={handleFileChange} className="mb-4" />
              <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                  Upload and Analyze
              </button>
          </form>

          {plotUrl && (
              <div className="mt-6">
                  <h2 className="text-xl font-bold mb-2">Seismic Data Plot</h2>
                  <img src={plotUrl} alt="Seismic Data Plot" className="max-w-full h-auto" />
              </div>
          )}
      </div>
  );
};

export default SignalAnalysisPage;
