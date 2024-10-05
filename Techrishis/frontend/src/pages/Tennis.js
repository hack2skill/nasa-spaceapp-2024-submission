import React, { useState } from 'react';

const Tennis = () => {
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [outputVideoUrl, setOutputVideoUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Handle file input change
    const handleVideoChange = (event) => {
        setSelectedVideo(event.target.files[0]);
        setOutputVideoUrl('');
        setError('');
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedVideo) {
            alert("Please select a video first.");
            return;
        }

        const formData = new FormData();
        formData.append('video', selectedVideo);

        setLoading(true);

        try {
            const response = await fetch('http://localhost:4000/api/evaluate-video', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error || 'An error occurred while processing the video');
                setLoading(false);
                return;
            }

            const data = await response.json();
            setOutputVideoUrl(`http://localhost:4000/${data.processedVideoPath}`);
        } catch (error) {
            setError('An error occurred. Please try again.');
            console.error('Error:', error);
        }

        setLoading(false);
    };

    return (
        <div>
            <h1>Upload a Video for Processing</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" accept="video/*" onChange={handleVideoChange} required />
                <button type="submit">Upload Video</button>
            </form>

            {loading && <p>Processing video, please wait...</p>}

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {outputVideoUrl && (
                <div>
                    <h2>Processed Video</h2>
                    <video src={outputVideoUrl} controls width="600"></video>
                </div>
            )}
        </div>
    );
};

export default Tennis;
