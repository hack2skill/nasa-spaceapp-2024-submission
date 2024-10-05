const Gallery = () => {
  const galleryItems = [
    {
      image: 'https://i.postimg.cc/WbkY39qP/Simple-To-Use.png',
      description: 'Simple To use tool.',
    },
    {
      image: 'https://i.postimg.cc/jSYgJzyn/Upload-Your-Image.png',
      description: 'Upload Your Image',
    },
    {
      image: 'https://i.postimg.cc/R0Mgg4sM/Get-Dtailed-Overview.png',
      description: 'Get the Detailed Overview. ',
    },
    {
      image: 'https://i.postimg.cc/W4XXKCC0/Final-Agenda.png',
      description: 'Final Agenda.',
    },
  ];

  return (
    <div
      className="w-[100vw] p-[10vmin] min-h-screen"
      style={{
        backgroundImage: 'url(https://images.adsttc.com/media/images/5d35/631c/284d/d171/0e00/018a/large_jpg/P07337_FP470837_indesign.jpg?1563779853)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h1 className="text-[5vmin] font-semibold text-center text-white mb-[4vmin]">
        Gallery
      </h1>

      <div className="grid grid-cols-1 gap-[4vmin] md:grid-cols-2 lg:grid-cols-3">
        {galleryItems.map((item, index) => (
          <div
            key={index}
            className="relative hover:scale-[1.05] transition-transform duration-300 ease-in-out overflow-hidden rounded-lg shadow-lg"
          >
            <img
              src={item.image}
              alt={item.description}
              className="h-[30vmin] w-full object-center transform hover:scale-110 transition-transform duration-300 ease-in-out"
            />
            <div className="p-[3vmin] bg-black bg-opacity-75 backdrop-blur-md">
              <p className="mt-[1vmin] text-[2.5vmin] text-gray-50">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
