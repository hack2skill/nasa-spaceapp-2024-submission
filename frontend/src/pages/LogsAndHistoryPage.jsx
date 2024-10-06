import { useEffect, useState } from 'react';
import axios from 'axios';

const LogsAndHistoryPage = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/api/logs');
                setLogs(response.data);
            } catch (error) {
                console.error('Error fetching logs:', error);
            }
        };

        fetchLogs();
    }, []);

    return (
        <div className="p-4 bg-gray-100">
            <h2 className="text-2xl font-bold mb-4 text-center">Uploaded Files</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 rounded shadow">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">File Name</th>
                            <th className="py-3 px-6 text-left">Time Created</th>
                            <th className="py-3 px-6 text-left">Download</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {logs.map((log, index) => (
                            <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6">{log.name}</td>
                                <td className="py-3 px-6">{new Date(log.time_created).toLocaleString()}</td>
                                <td className="py-3 px-6">
                                    <a href={log.download_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                        Download
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LogsAndHistoryPage;
