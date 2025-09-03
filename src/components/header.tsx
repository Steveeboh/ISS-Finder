import { useState } from 'react';
import { Link } from 'react-router-dom';
import RiggedmotionSvg from '/assets/Riggedmotion.svg';
import { Menu, X } from 'lucide-react';

export function HeaderComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-sm bg-black/30 border-b border-white/10">
      <div className="container mx-auto py-4">
        <div className="flex justify-between items-center px-4">
          <Link to="/" className="flex-shrink-0">
            <img src={RiggedmotionSvg} alt="logo" className="h-8" />
          </Link>

          <button
            onClick={toggleMenu}
            className="lg:hidden text-white focus:outline-none"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          <nav
            className={`absolute lg:static top-16 left-0 w-full lg:w-auto bg-black lg:bg-transparent flex-col lg:flex-row lg:flex items-center space-x-0 lg:space-x-8 gap-6 ${
              isMenuOpen ? 'flex' : 'hidden'
            } lg:flex py-4 lg:py-0 px-4 lg:px-0 border-b border-white/10 lg:border-0`}
          >
            <Link
              to="/projekte"
              className="text-gray-200 hover:text-[#DBD2A4] transition-colors py-2 lg:py-0"
            >
              Projekte
            </Link>
            <Link
              to="/mystartup"
              className="text-gray-200 hover:text-[#DBD2A4] transition-colors py-2 lg:py-0"
            >
              MyStartUp
            </Link>
            <Link
              to="/contact"
              className="text-gray-200 hover:text-[#DBD2A4] transition-colors py-2 lg:py-0"
            >
              Kontakt
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
