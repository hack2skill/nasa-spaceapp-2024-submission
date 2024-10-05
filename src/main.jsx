import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import App from './App.jsx';
import Home from './Components/Home.jsx';
import About from './Components/About.jsx';
import Demo from './Components/Demo.jsx';
import Contact from './Components/Contact.jsx';
import Navbar from './Components/Navbar.jsx';  // Import Navbar
import './index.css';
import Gallery from './Components/Gallery.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Navbar /> 
        <Outlet />  
      </>
    ),
    children: [
      { path: '/', element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'demo', element: <Demo /> },
      { path: 'contact', element: <Contact /> },
      { path: 'gallery', element: <Gallery /> },

    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
