import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// pages & components
import Home from './pages/Home';
import Explore from './pages/Explore'; 
import ContactUs from './pages/ContactUs';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Footer from './components/Footer';
import About from './pages/about';
import Sports from './pages/Sports'; 
import Tennis from "./pages/Tennis";
import Cricket from "./pages/Cricket";
import Football from "./pages/Football";
import Badminton from "./pages/Badminton";
import Basketball from "./pages/Basketball";

function App() {
  const location = useLocation();

  useEffect(() => {
    const body = document.body;
    const path = location.pathname;

    // Apply background class only for specific routes
    if (path === "/explore") {
      body.classList.add("bg-explore");
      body.classList.remove("bg-default", "bg-home", "bg-sports", "bg4");
    } else if (path === "/sports") {
      body.classList.add("bg-sports");
      body.classList.remove("bg-default", "bg-home", "bg-explore", "bg4");
    } else if (path === "/") {
      body.classList.add("bg-home");
      body.classList.remove("bg-default", "bg-explore", "bg-sports", "bg4");
    } else if (["/login", "/signup", "/contact", "/about", "/faq"].includes(path)) {
      body.classList.add("bg4");
      body.classList.remove("bg-default", "bg-home", "bg-explore", "bg-sports");
    } else {
      body.classList.add("bg-default");
      body.classList.remove("bg-home", "bg-explore", "bg-sports", "bg4");
    }
  }, [location]);

  return (
    <div className="App">
      <div className="pages">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about" element={<About />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/sports/cricket" element={<Cricket />} />
          <Route path="/sports/football" element={<Football />} />
          <Route path="/sports/tennis" element={<Tennis />} />
          <Route path="/sports/badminton" element={<Badminton />} />
          <Route path="/sports/basketball" element={<Basketball />} />
        </Routes>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
