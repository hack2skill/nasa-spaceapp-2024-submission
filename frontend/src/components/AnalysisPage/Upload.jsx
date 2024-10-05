import { useState } from 'react';
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
            setData(response.data.filtered_data);  
            setSpectrogram(response.data.spectrogram_path); 
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4 text-center">Upload Seismic Data CSV</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Upload
                </button>
            </form>

            {data && (
                <div>
                    <h2 className="text-2xl font-bold my-4">Seismic Data with Noise Filtering</h2>
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
                        <Line type="monotone" dataKey="velocity(c/s)" stroke="blue" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="filtered" stroke="red" />
                    </LineChart>

                    <h2 className="text-2xl font-bold my-4">Spectrogram</h2>
                    {spectrogram && (
                        <img src={`http://127.0.0.1:5000/${spectrogram}`} alt="Spectrogram" className="my-4 max-w-full h-auto" />
                    )}
                </div>
            )}
        </div>
    );
};

export default Upload;
