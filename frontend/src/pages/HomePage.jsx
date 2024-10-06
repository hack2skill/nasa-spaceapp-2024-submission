
const HomePage = () => {
  return (
    <div className="relative w-full h-screen">
        <video
            autoPlay
            loop
            muted
            className="absolute top-0 left-0 w-full min-h-full object-cover z-0"
        >
            <source src="../../public/bgvid.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>

        <div className="relative z-10 flex flex-col items-center justify-center h-full bg-black bg-opacity-50">
            <h1 className="text-white text-4xl font-bold mb-6">Welcome to the Dashboard</h1>
            <p className="text-white text-lg mb-4">Here is some important information.</p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Action Button
            </button>
        </div>
    </div>
);
};

export default HomePage