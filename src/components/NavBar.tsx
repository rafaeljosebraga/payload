
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
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className={cn(
                "text-xl font-bold transition-colors duration-300",
                needsDarkText ? "text-ifnmg-blue" : "text-white"
              )}>NDTI</span>
              <span className={cn(
                "hidden sm:block text-sm transition-colors duration-300",
                needsDarkText ? "text-gray-600" : "text-gray-200"
              )}>IFNMG Campus Montes Claros</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 lg:space-x-10">
            {menuItems.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  to={item.link}
                  onClick={handleLinkClick}
                  className={cn(
                    "transition-all duration-300 hover:text-ifnmg-blue relative",
                    activeSection === item.id 
                      ? "text-ifnmg-blue font-medium" 
                      : needsDarkText ? "text-gray-600" : "text-white"
                  )}
                >
                  {item.name}
                  <span className={cn(
                    "absolute -bottom-1 left-0 w-0 h-0.5 bg-ifnmg-blue transform transition-all duration-300 hover:w-full",
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
                "transition-colors duration-300 focus:outline-none p-2",
                needsDarkText ? "text-gray-600 hover:text-ifnmg-blue" : "text-white hover:text-gray-300"
              )}
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={24} className="animate-in fade-in rotate-in" /> : <Menu size={24} className="animate-in fade-in" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={cn(
          "md:hidden overflow-hidden transition-all duration-300 max-h-0 bg-white/95 backdrop-blur-sm rounded-b-lg shadow-md",
          isOpen ? "max-h-[500px] mt-3 p-3" : "max-h-0"
        )}>
          <div className="space-y-1">
            {menuItems.map((item) => (
              <div key={item.name}>
                <Link
                  to={item.link}
                  onClick={handleLinkClick}
                  className={cn(
                    "block px-4 py-2.5 text-base hover:bg-gray-50 rounded-md transition-colors",
                    activeSection === item.id ? "text-ifnmg-blue font-medium" : "text-gray-600"
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
