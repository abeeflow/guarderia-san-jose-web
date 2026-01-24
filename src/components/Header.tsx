import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-solid border-[#f0f0f5]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-4 text-primary">
          <div className="h-12 w-auto">
            <img src="/logo.png" alt="Logo" className="h-full w-auto object-contain" />
          </div>
          <h2 className="text-[#111118] text-xl font-extrabold tracking-tight">Guardería Jardín Bilingüe San José</h2>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            to="/" 
            className={`text-sm font-semibold hover:text-primary transition-colors ${isActive('/') ? 'text-primary' : 'text-[#111118]'}`}
          >
            Inicio
          </Link>
          <a className="text-sm font-semibold hover:text-primary transition-colors" href="/#programs">Programas</a>
          <a className="text-sm font-semibold hover:text-primary transition-colors" href="/#educational-project">Nosotros</a>
          <a className="text-sm font-semibold hover:text-primary transition-colors" href="/#events">Eventos</a>
        </nav>
        
        <div className="flex items-center gap-4">
          <button className="hidden sm:flex min-w-[100px] cursor-pointer items-center justify-center rounded-lg h-10 px-5 bg-primary text-white text-sm font-bold tracking-wide hover:opacity-90 transition-opacity">
            Portal Padres
          </button>
        </div>
      </div>
    </header>
  );
}
