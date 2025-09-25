
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setActiveDropdown(null);
    }
  };

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  // Handle scroll events to detect when the navbar should have background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update active section from external sources (like IntersectionObserver in Index.tsx)
  useEffect(() => {
    const handleSectionChange = (event: CustomEvent) => {
      setActiveSection(event.detail.section);
    };

    window.addEventListener('sectionChange' as any, handleSectionChange);
    return () => window.removeEventListener('sectionChange' as any, handleSectionChange);
  }, []);

  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    if (isMobile) {
      setIsOpen(false);
      setActiveDropdown(null);
    }
  };

  const menuItems = [
    { name: "Home", link: "/", id: "hero" },
    { name: "Novidades", link: "/novidades", id: "novidades" },
    { name: "O NDTI", link: "/sobre-ndti", id: "sobre-ndti" },
    { name: "Equipe", link: isHomePage ? "/#equipe" : "/equipe", id: "equipe" },
    { name: "Projetos", link: "/projetos", id: "projetos" },
    { name: "Equipamentos", link: "/equipamentos", id: "equipamentos" }
  ];

  // Check if we're on a page that needs dark text regardless of scroll
  const isNonHomePage = location.pathname !== '/';
  const needsDarkText = isNonHomePage || isScrolled;

  return (
    <nav className={cn(
      "fixed w-full z-50 transition-all duration-300",
      isScrolled || isNonHomePage ? "bg-white/95 backdrop-blur-sm shadow-md" : "bg-transparent"
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 sm:space-x-3">
              <span className={cn(
                "text-lg sm:text-xl lg:text-2xl font-bold transition-colors duration-300",
                needsDarkText ? "text-ifnmg-blue" : "text-white"
              )}>NDTI</span>
              <span className={cn(
                "hidden sm:block text-xs sm:text-sm lg:text-base transition-colors duration-300",
                needsDarkText ? "text-gray-600" : "text-gray-200"
              )}>IFNMG Campus Montes Claros</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-2 lg:space-x-4 xl:space-x-6">
            {menuItems.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  to={item.link}
                  onClick={handleLinkClick}
                  className={cn(
                    "text-sm lg:text-base xl:text-lg font-medium transition-all duration-300 hover:text-ifnmg-blue relative px-1.5 py-0.5",
                    activeSection === item.id 
                      ? "text-ifnmg-blue font-semibold" 
                      : needsDarkText ? "text-gray-700" : "text-white"
                  )}
                >
                  {item.name}
                  <span className={cn(
                    "absolute -bottom-1 left-0 w-0 h-1 bg-ifnmg-blue transform transition-all duration-300 hover:w-full rounded-full",
                    activeSection === item.id && "w-full"
                  )}></span>
                </Link>
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMenu} 
              className={cn(
                "transition-colors duration-300 focus:outline-none p-1.5 sm:p-2",
                needsDarkText ? "text-gray-600 hover:text-ifnmg-blue" : "text-white hover:text-gray-300"
              )}
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={28} className="animate-in fade-in rotate-in" /> : <Menu size={28} className="animate-in fade-in" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={cn(
          "md:hidden overflow-hidden transition-all duration-300 max-h-0 bg-white/95 backdrop-blur-sm rounded-b-lg shadow-md",
          isOpen ? "max-h-[500px] mt-3 sm:mt-4 p-4 sm:p-5" : "max-h-0"
        )}>
          <div className="space-y-1.5">
            {menuItems.map((item) => (
              <div key={item.name}>
                <Link
                  to={item.link}
                  onClick={handleLinkClick}
                  className={cn(
                    "block px-3 sm:px-4 py-2 sm:py-2.5 text-base sm:text-lg font-medium hover:bg-gray-50 rounded-md transition-colors",
                    activeSection === item.id ? "text-ifnmg-blue font-semibold bg-ifnmg-blue/10" : "text-gray-700"
                  )}
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
