import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll spy
  useEffect(() => {
    // Only run scroll spy on home page
    if (location.pathname !== '/') return;

    const handleScroll = () => {
      const sections = ['home', 'programs', 'educational-project', 'events'];
      
      // Calculate scroll position with offset for header
      const scrollPosition = window.scrollY + 100;

      // Find the current active section
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          setActiveSection(sectionId);
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(sectionId); // Set immediately for better UX
      }
    }
  };

  const getLinkClass = (sectionId: string) => {
    // Base styles
    const base = "text-sm font-semibold transition-all duration-300 px-4 py-2 rounded-full";
    
    // If not on home page, default inactive style
    if (location.pathname !== '/') {
        return `${base} text-[#111118] hover:text-primary hover:bg-blue-50`;
    }
    
    return activeSection === sectionId 
      ? `${base} bg-primary text-white shadow-lg shadow-blue-500/30` 
      : `${base} text-[#111118] hover:text-primary hover:bg-blue-50`;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-solid border-[#f0f0f5]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-4 text-primary" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="h-12 w-auto">
            <img src="/logo.png" alt="Logo" className="h-full w-auto object-contain" />
          </div>
          <h2 className="text-[#111118] text-xl font-extrabold tracking-tight">Guardería Jardín Bilingüe San José</h2>
        </Link>
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-[#111118] hover:bg-gray-100 rounded-lg transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        <nav className="hidden md:flex items-center gap-2">
          <a 
            href="#home"
            onClick={(e) => handleNavClick(e, 'home')}
            className={getLinkClass('home')}
          >
            Inicio
          </a>
          <a 
            href="#programs" 
            onClick={(e) => handleNavClick(e, 'programs')}
            className={getLinkClass('programs')}
          >
            Programas
          </a>
          <a 
            href="#educational-project" 
            onClick={(e) => handleNavClick(e, 'educational-project')}
            className={getLinkClass('educational-project')}
          >
            Nosotros
          </a>
          <a 
            href="#events" 
            onClick={(e) => handleNavClick(e, 'events')}
            className={getLinkClass('events')}
          >
            Eventos
          </a>
        </nav>
        
        
      </div>
      {isMobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed top-16 left-4 right-4 z-[60] md:hidden">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-3 space-y-2">
              <a
                href="#home"
                onClick={(e) => {
                  handleNavClick(e, 'home');
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full ${getLinkClass('home')} text-center`}
              >
                Inicio
              </a>
              <a
                href="#programs"
                onClick={(e) => {
                  handleNavClick(e, 'programs');
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full ${getLinkClass('programs')} text-center`}
              >
                Programas
              </a>
              <a
                href="#educational-project"
                onClick={(e) => {
                  handleNavClick(e, 'educational-project');
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full ${getLinkClass('educational-project')} text-center`}
              >
                Nosotros
              </a>
              <a
                href="#events"
                onClick={(e) => {
                  handleNavClick(e, 'events');
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full ${getLinkClass('events')} text-center`}
              >
                Eventos
              </a>
              
            </div>
          </div>
        </>
      )}
    </header>
  );
}
