const Demo = () => {
  const response1 = 'https://images6.alphacoders.com/667/667544.jpg';
  const response2 = 'https://images.unsplash.com/photo-1614726365930-627c75da663e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3';

  return (
    <section
      className="py-16 h-[100vh] bg-black text-white bg-no-repeat bg-center bg-cover"
      style={{ backgroundImage: `url(${response1})` }}
    >
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-6">Try Our Demo</h2>
        <p className="text-white font-bold mb-8">
          Experience the power of our technology with this interactive demo. See how we can make a difference in your space exploration journey.
        </p>
        <div className="bg-black bg-opacity-55 hover:bg-opacity-100 rounded-lg shadow-lg overflow-hidden hover:scale-105 transform transition duration-300 ease-in-out inline-block">
          <img
            src={response2}
            alt="Illustration of space exploration"
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h3 className="text-2xl font-semibold mb-3">Interactive Space Exploration</h3>
            <p className="text-gray-400 mb-4">
              Explore the universe with our cutting-edge simulation tools.
            </p>
            <a
              href="https://final-space-ai999.onrender.com/"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-2 px-4 rounded-full hover:opacity-90 transition duration-300 inline-block"
              role="button"
            >
              Try Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;
