import React, { useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

const Upload = () => {
    const [file, setFile] = useState(null);
    const [data, setData] = useState(null);
    const [spectrogram, setSpectrogram] = useState('');

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
            const response = await axios.post('http://127.0.0.1:5000/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setData(response.data.filtered_data);  // Store the filtered data
            setSpectrogram(response.data.spectrogram_path);  // Store the path for the spectrogram
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const handleDownload = () => {
        window.open('http://127.0.0.1:5000/api/download', '_blank'); // Download filtered data CSV
    };

    return (
        <div>
            <h1>Upload Seismic Data CSV</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>

            {data && (
                <div>
                    <h2>Seismic Data with Noise Filtering</h2>
                    <LineChart
                        width={600}
                        height={300}
                        data={data}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="rel_time(sec)" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="velocity(c/s)" stroke="blue" />
                        <Line type="monotone" dataKey="filtered" stroke="red" />
                    </LineChart>

                    <h2>Spectrogram</h2>
                    <img src={`http://127.0.0.1:5000/${spectrogram}`} alt="Spectrogram" />
                    <button onClick={handleDownload}>Download Filtered Data</button>
                </div>
            )}
        </div>
    );
};

export default Upload;
