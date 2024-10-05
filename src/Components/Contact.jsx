






import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import Planet from './Planet';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted!');
  };

  return (
    <div style={{ height: '100vh', width: '100vw', display: 'flex', backgroundColor: 'black', position: 'relative', overflow: 'hidden' }}>
  {/* Contact Form Section */}
  <div className="absolute top-0 left-0 right-0 bottom-0 z-10 flex items-center justify-center p-4">
    <div className="contact-form p-4 sm:p-6 md:p-8 lg:p-10 w-full max-w-md bg-[#3a3a3ab3] border border-gray-700 rounded-lg shadow-2xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-6">Contact Us</h2>
        <label className="block">
          <span className="text-white">Name</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-2 block w-full px-3 py-2 sm:px-4 sm:py-3 bg-transparent border border-gray-500 rounded-md shadow-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Your Name"
          />
        </label>
        <label className="block">
          <span className="text-white">Email</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-2 block w-full px-3 py-2 sm:px-4 sm:py-3 bg-transparent border border-gray-500 rounded-md shadow-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Your Email"
          />
        </label>
        <label className="block">
          <span className="text-white">Message</span>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="mt-2 block w-full px-3 py-2 sm:px-4 sm:py-3 bg-transparent border border-gray-500 rounded-md shadow-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="4"
            placeholder="Your Message"
          />
        </label>
        <button
          type="submit"
          className="w-full py-2 sm:py-3 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Send Message
        </button>
      </form>
      <div className="flex justify-center mt-4 space-x-4 sm:space-x-6">
        <a
          href="https://wa.me/1234567890?text=Hello%2C%20I%20need%20assistance"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1024px-WhatsApp.svg.png"
            alt="WhatsApp"
            className="w-8 h-8 sm:w-10 sm:h-10 transition-transform transform hover:scale-110"
          />
        </a>
        <a
          href="mailto:rahulchaudhary9611@gmail.com?subject=Contact%20Form&body=Hello%2C%20I%20need%20assistance"
          className="text-blue-500 hover:underline"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Gmail_icon_%282013-2020%29.svg/1024px-Gmail_icon_%282013-2020%29.svg.png"
            alt="Email"
            className="w-8 h-8 sm:w-10 sm:h-10 transition-transform transform hover:scale-110"
          />
        </a>
      </div>
    </div>
  </div>

  

      {/* 3D Canvas Section */}
      <Canvas className="absolute inset-0" camera={{ position: [0, 0, 10], fov: 60 }}>
        <Stars 
          radius={150} 
          depth={70} 
          count={7000} 
          factor={6} 
          saturation={0} 
          fade 
          speed={1.5}
        />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} />
        <Planet position={[1, 0, 6]} textureURL="https://t4.ftcdn.net/jpg/03/09/04/59/360_F_309045980_zKAgyd8feCR69CMWQ1PlhCHhteODo9zd.jpg" size={1} />
      </Canvas>
    </div>
  );
};

export default Contact;
