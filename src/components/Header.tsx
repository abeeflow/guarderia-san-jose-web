import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-solid border-[#f0f0f5]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-4 text-primary">
          <div className="size-8">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path 
                clipRule="evenodd" 
                d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z" 
                fill="currentColor" 
                fillRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-[#111118] text-xl font-extrabold tracking-tight">San Jose Kindergarten</h2>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            to="/" 
            className={`text-sm font-semibold hover:text-primary transition-colors ${isActive('/') ? 'text-primary' : 'text-[#111118]'}`}
          >
            Inicio
          </Link>
          <Link 
            to="/enrollment" 
            className={`text-sm font-semibold hover:text-primary transition-colors ${isActive('/enrollment') ? 'text-primary' : 'text-[#111118]'}`}
          >
            Inscripciones
          </Link>
          <a className="text-sm font-semibold hover:text-primary transition-colors" href="#programs">Programas</a>
          <a className="text-sm font-semibold hover:text-primary transition-colors" href="#about">Nosotros</a>
          <a className="text-sm font-semibold hover:text-primary transition-colors" href="#contact">Contacto</a>
        </nav>
        
        <div className="flex items-center gap-4">
          <button className="hidden sm:flex min-w-[100px] cursor-pointer items-center justify-center rounded-lg h-10 px-5 bg-primary text-white text-sm font-bold tracking-wide hover:opacity-90 transition-opacity">
            Portal Padres
          </button>
          <button className="flex items-center justify-center rounded-lg h-10 px-3 bg-gray-100 text-sm font-bold">
            ES
          </button>
        </div>
      </div>
    </header>
  );
}
