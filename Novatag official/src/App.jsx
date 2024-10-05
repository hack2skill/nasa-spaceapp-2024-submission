import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import Planets from "./Components/Planets";
import Explore from "./Components/Explore";
import Faq from "./Components/Faq";
import Quiz from "./Components/Quiz";
import Dashboard from "./Components/Dashboard";
function App() {
  

  return (
    <>
      {/* Video background container */}
      <div className='fixed top-0 left-0 w-full h-full -z-10'>
        <video className="absolute top-0 left-0 w-full h-full object-cover" src="/bg.mp4" type="video/mp4" autoPlay loop muted />
      </div>

      {/* <div className="fixed top-0 left-0 w-full h-full bg-black/50 -z-5"></div> */}

      <div className="relative">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/planets" element={<Planets />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/quiz" element={<Quiz/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
