import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrollingProgrammatically, setIsScrollingProgrammatically] = useState(false);

  // Handle scroll spy
  useEffect(() => {
    // Only run scroll spy on home page
    if (location.pathname !== '/') return;

    const handleScroll = () => {
      // Don't update active section if we're scrolling programmatically (via click)
      if (isScrollingProgrammatically) return;

      const sections = ['home', 'programs', 'educational-project', 'events', 'contact'];
      
      // Calculate scroll position with offset for header
      const scrollPosition = window.scrollY + 150;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Check sections in reverse order (bottom to top) for better accuracy
      let activeFound = false;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section);
        if (element && !activeFound) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          // Special handling for the last section (contact)
          if (i === sections.length - 1) {
            // If we're near the bottom of the page or past the contact section start
            if (scrollPosition >= offsetTop - 150 || 
                (window.scrollY + windowHeight >= documentHeight - 100)) {
              setActiveSection(section);
              activeFound = true;
              break;
            }
          } else {
            // For other sections, check if we're within the section bounds
            if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
              setActiveSection(section);
              activeFound = true;
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname, isScrollingProgrammatically]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    
    // Set active section immediately for better UX
    setActiveSection(sectionId);
    
    // Disable scroll spy temporarily to prevent it from overriding our selection
    setIsScrollingProgrammatically(true);
    
    // Special handling for "home" section - scroll to absolute top
    if (sectionId === 'home') {
      if (location.pathname !== '/') {
        navigate('/');
        // Wait for navigation to complete then scroll to top
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          // Re-enable scroll spy after scroll completes
          setTimeout(() => {
            setIsScrollingProgrammatically(false);
            setActiveSection(sectionId);
          }, 1000);
        }, 100);
      } else {
        // Scroll directly to top absolute
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // Re-enable scroll spy after scroll completes
        setTimeout(() => {
          setIsScrollingProgrammatically(false);
          setActiveSection(sectionId);
        }, 1000);
      }
      return;
    }
    
    // For other sections, use scrollIntoView with offset
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          // Re-enable scroll spy after scroll completes (smooth scroll takes ~500-800ms)
          setTimeout(() => {
            setIsScrollingProgrammatically(false);
            setActiveSection(sectionId);
          }, 1000);
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        // Re-enable scroll spy after scroll completes
        setTimeout(() => {
          setIsScrollingProgrammatically(false);
          setActiveSection(sectionId);
        }, 1000);
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
          <a 
            href="#contact" 
            onClick={(e) => handleNavClick(e, 'contact')}
            className={getLinkClass('contact')}
          >
            Visitanos
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
              <a
                href="#contact"
                onClick={(e) => {
                  handleNavClick(e, 'contact');
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full ${getLinkClass('contact')} text-center`}
              >
                Visitanos
              </a>
              
            </div>
          </div>
        </>
      )}
    </header>
  );
}
