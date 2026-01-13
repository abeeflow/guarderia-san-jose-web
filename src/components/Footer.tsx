import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#111118] text-white py-16">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 border-b border-white/10 pb-12">
          {/* Brand */}
          <div className="flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-4 text-white">
              <div className="size-8">
                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    clipRule="evenodd" 
                    d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z" 
                    fill="white" 
                    fillRule="evenodd"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-extrabold tracking-tight">San Jose Kindergarten</h2>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Dedicados a proporcionar educacion bilingue de alta calidad desde 1998. Nutriendo los corazones y mentes de la proxima generacion.
            </p>
            <div className="flex gap-4">
              <a className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors" href="#">
                <span className="material-symbols-outlined text-lg">public</span>
              </a>
              <a className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors" href="#">
                <span className="material-symbols-outlined text-lg">video_library</span>
              </a>
              <a className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors" href="#">
                <span className="material-symbols-outlined text-lg">share</span>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-6">Enlaces Rapidos</h4>
            <ul className="flex flex-col gap-4 text-sm text-gray-400">
              <li><a className="hover:text-white transition-colors" href="#">Calendario Academico</a></li>
              <li><Link className="hover:text-white transition-colors" to="/enrollment">Proceso de Inscripcion</Link></li>
              <li><a className="hover:text-white transition-colors" href="#">Protocolos de Seguridad</a></li>
              <li><a className="hover:text-white transition-colors" href="#">Oportunidades Laborales</a></li>
            </ul>
          </div>
          
          {/* Programs */}
          <div>
            <h4 className="font-bold mb-6">Programas</h4>
            <ul className="flex flex-col gap-4 text-sm text-gray-400">
              <li><a className="hover:text-white transition-colors" href="#">Guarderia</a></li>
              <li><a className="hover:text-white transition-colors" href="#">Preescolar</a></li>
              <li><a className="hover:text-white transition-colors" href="#">Pre-Kinder</a></li>
              <li><a className="hover:text-white transition-colors" href="#">Kinder</a></li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div className="flex flex-col gap-6">
            <h4 className="font-bold">Boletin Informativo</h4>
            <p className="text-sm text-gray-400">Mantente informado con nuestras noticias mensuales y consejos para padres.</p>
            <div className="flex gap-2">
              <input 
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:border-primary transition-colors" 
                placeholder="Correo electronico" 
                type="email"
              />
              <button className="bg-primary px-4 py-2 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity">
                Unirse
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-gray-500">
          <p>&copy; 2024 San Jose Bilingual Kindergarten. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <a className="hover:text-white" href="#">Politica de Privacidad</a>
            <a className="hover:text-white" href="#">Terminos de Servicio</a>
            <a className="hover:text-white" href="#">Configuracion de Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
