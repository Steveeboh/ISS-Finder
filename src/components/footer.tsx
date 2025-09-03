import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export function FooterComponent() {
  // State to toggle menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle menu handler
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <footer className="backdrop-blur-sm bg-black/30 border-b border-white/10">
      <div className="container mx-auto py-4">
        <div className="flex flex-col lg:flex-row items-center justify-between px-4 gap-4 relative">
          <div className="text-sm text-white order-2 lg:order-1">
            &copy; 2024 Rigged Motion Studios. All rights reserved.
          </div>

          {/* Burger Menu Button for Mobile */}
          <button
            onClick={toggleMenu}
            className="lg:hidden text-white focus:outline-none self-end order-1"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          <nav
            className={`${
              isMenuOpen ? "flex" : "hidden"
            } lg:flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-8 w-full lg:w-auto order-3 lg:order-2 bg-black lg:bg-transparent py-4 lg:py-0 absolute lg:static bottom-full lg:bottom-auto left-0 border-b border-white/10 lg:border-0 mb-4 lg:mb-0`}
          >
            <a
              href="/assets/legal/terms_of_service.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 hover:text-[#DBD2A4] transition-colors"
            >
              AGB
            </a>

            <Link
              to="/impressum"
              className="text-gray-200 hover:text-[#DBD2A4] transition-colors"
            >
              Impressum
            </Link>

            <Link
              to="/datenschutz"
              className="text-gray-200 hover:text-[#DBD2A4] transition-colors"
            >
              Datenschutz
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
