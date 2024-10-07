import React from 'react';
import Navbar from '../components/Navbar';
import background from "../assets/images/background.jpg";

const IframeComponent = () => {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Navbar />
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <div className="relative w-full h-0 pb-[56.25%] shadow-md rounded-lg overflow-hidden">
            <iframe 
              loading="lazy" 
              src="https://www.canva.com/design/DAGS1cRyOss/xi9FxDX46QezY3iV1DIM8A/view?embed" 
              allowFullScreen 
              className="absolute top-0 left-0 w-full h-full border-0"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IframeComponent;