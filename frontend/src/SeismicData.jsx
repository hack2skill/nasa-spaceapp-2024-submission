import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SeismicData = () => {
    const [seismicData, setSeismicData] = useState([]);
    const [modelAccuracy, setModelAccuracy] = useState(null);

    // Fetch seismic data from Flask backend
    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/seismic_data')
            .then(response => {
                setSeismicData(response.data);
            })
            .catch(error => console.error('Error fetching seismic data:', error));
    }, []);

    // Train the AI model
    const trainModel = () => {
        axios.post('http://127.0.0.1:5000/api/train_model')
            .then(response => {
                setModelAccuracy(response.data.accuracy);
            })
            .catch(error => console.error('Error training model:', error));
    };

    return (
        <div>
            <h1>Seismic Events Data</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Relative Time (sec)</th>
                        <th>Velocity (c/s)</th>
                    </tr>
                </thead>
                <tbody>
                    {seismicData.map((event, index) => (
                        <tr key={index}>
                            <td>{event["time(%Y-%m-%dT%H:%M:%S.%f)"]}</td>
                            <td>{event["rel_time(sec)"]}</td>
                            <td>{event["velocity(c/s)"]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button onClick={trainModel}>Train AI Model</button>
            {modelAccuracy && <p>Model Accuracy: {modelAccuracy}</p>}
        </div>
    );
};

export default SeismicData;
