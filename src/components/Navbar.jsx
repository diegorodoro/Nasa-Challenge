import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import space from '../assets/images/space.png'
import { Link } from 'react-router-dom';

const Navbar = ({ currentPlanet, totalPlanets }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed top-5 left-0 right-0 z-50 bg-transparent b">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center py-2">
          {/* Logo */}
          <a href="/" className="text-white text-base md:text-lg tracking-wide font-light">
            Pinguland-IberoPue
          </a>

          {/* Desktop Navigation */}
          <nav className="p-4 flex space-x-4">
            <Link 
              to="/orrey" 
              className="flex items-center -mt-3 cursor-pointer hover:opacity-65 transition-opacity duration-200"
            >
              <p className="text-white text-lg mr-2">Orrey</p>
              <img src={space} alt="Orrey" className="h-12 w-12" />
            </Link>
            <Link 
              to="/team" 
              className="text-neutral-300 hover:text-white transition-colors duration-300 font-light"
              onClick={closeMenu}
            >
              Team
              <span className="block w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full absolute bottom-[-4px] left-0" />
            </Link>
            <Link 
              to="/about" 
              className="text-neutral-300 hover:text-white transition-colors duration-300 font-light"
              onClick={closeMenu}
            >
              About
              <span className="block w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full absolute bottom-[-4px] left-0" > 
                
              </span>
            </Link>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={toggleMenu}
            className="text-neutral-400 hover:text-white focus:outline-none md:hidden"
            aria-label="Toggle menu"
          >
            <img src={isOpen ? 'assets/close.svg' : 'assets/menu.svg'} alt="toggle" className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-md border-t border-neutral-800">
          <nav className="p-4">
      <Link 
        to="/orrey" 
        className="flex items-center cursor-pointer hover:opacity-65 transition-opacity duration-200 mb-3"
      >
        <p className="text-white text-lg mr-2">Orrey</p>
        <img src={spaceImage} alt="Orrey" className="h-24 w-24" />
      </Link>
      <Link 
        to="/team" 
        className="block text-neutral-300 hover:text-white transition-colors duration-300 font-light mb-4"
        onClick={closeMenu}
      >
        Team
      </Link>
      <Link 
        to="/about" 
        className="block text-neutral-300 hover:text-white transition-colors duration-300 font-light"
        onClick={closeMenu}
      >
        About
      </Link>
    </nav>
        </div>
      )}

      {/* Centered Progress Bar */}
      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-4 w-full max-w-sm px-6">
        <div className="bg-neutral-700 h-1 w-full rounded-full">
          <div
            className="bg-white h-1 rounded-full transition-all duration-300"
            style={{ width: `${(currentPlanet / (totalPlanets - 1)) * 100}%` }}
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
