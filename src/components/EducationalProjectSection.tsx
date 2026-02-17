import { useState } from 'react';
import TeachersModal from './TeachersModal';

const projectItems = [
  {
    id: 1,
    text: "ENFOQUE EN EL DESARROLLO SOCIOEMOCIONAL",
    icon: "psychology",
    color: "text-orange-500",
    borderColor: "border-orange-200",
    hoverBorder: "hover:border-orange-400",
    bg: "bg-orange-50",
    shadow: "shadow-orange-100"
  },
  {
    id: 2,
    text: "APRENDIZAJE LÚDICO Y CREATIVO",
    icon: "star",
    color: "text-cyan-500",
    borderColor: "border-cyan-200",
    hoverBorder: "hover:border-cyan-400",
    bg: "bg-cyan-50",
    shadow: "shadow-cyan-100"
  },
  {
    id: 3,
    text: "PROGRAMA DE PSICOMOTRICIDAD TEMPRANA",
    icon: "directions_run",
    color: "text-green-500",
    borderColor: "border-green-200",
    hoverBorder: "hover:border-green-400",
    bg: "bg-green-50",
    shadow: "shadow-green-100"
  },
  {
    id: 4,
    text: "CLASES DE MÚSICA Y ARTE",
    icon: "music_note",
    color: "text-purple-500",
    borderColor: "border-purple-200",
    hoverBorder: "hover:border-purple-400",
    bg: "bg-purple-50",
    shadow: "shadow-purple-100"
  },
  {
    id: 5,
    text: "PROGRAMA CRECEMOS EN VALORES",
    image: "/crecemos.png",
    color: "text-pink-500",
    borderColor: "border-pink-200",
    hoverBorder: "hover:border-pink-400",
    bg: "bg-pink-50",
    shadow: "shadow-pink-100"
  },
  {
    id: 6,
    text: "EDUCACIÓN BILINGÜE",
    subtitle: "Inglés - Francés",
    icon: "translate",
    color: "text-indigo-500",
    borderColor: "border-indigo-200",
    hoverBorder: "hover:border-indigo-400",
    bg: "bg-indigo-50",
    shadow: "shadow-indigo-100"
  }
];

export default function EducationalProjectSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="min-h-screen min-h-[100vh] w-full flex flex-col bg-[#f5f5f8] pt-[80px] overflow-hidden scroll-mt-0" id="educational-project">
      <div className="flex-1 w-full overflow-visible">
        <div className="min-h-full flex flex-col justify-center items-center py-4 sm:py-6 md:py-8 lg:py-10 xl:py-12">
          <div className="max-w-[1280px] w-full mx-auto px-6 lg:px-10">
        
        {/* Main Title */}
        <div className="text-center mb-4 sm:mb-5 md:mb-6">
          <h2 className="text-[#111118] text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-extrabold tracking-tight">
            Conócenos
          </h2>
        </div>

        {/* Main Top Card */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 lg:p-8 mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
            
            {/* Left Column: Philosophy */}
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center text-purple-400 mb-1">
                <span className="material-symbols-outlined text-2xl">lightbulb</span>
              </div>
              <h3 className="text-xl font-bold text-[#111118]">Nuestra Filosofía</h3>
              <p className="text-[#5f5f8c] text-sm lg:text-base font-medium leading-relaxed text-justify">
                Somos una guardería bilingüe dedicada a potenciar lo mejor de los más pequeños.
                Ofrecemos un ambiente seguro y estimulante, centrado en el desarrollo integral y felicidad.
              </p>
            </div>

            {/* Middle Column: Installations */}
            <div className="flex flex-col items-center gap-3 text-center border-t lg:border-t-0 lg:border-l lg:border-r border-gray-100 py-6 lg:py-0">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-400 mb-1">
                <span className="material-symbols-outlined text-2xl">domain</span>
              </div>
              <h3 className="text-xl font-bold text-[#111118]">Nuestras Instalaciones</h3>
              <div className="text-[#5f5f8c] text-sm font-medium text-justify">
                <p>Aulas Equipadas y Seguras</p>
                <p>Áreas de Juego al Aire Libre</p>
              </div>

              <button 
                onClick={() => {
                  console.log('Opening Teachers Modal');
                  setIsModalOpen(true);
                }}
                className="mt-2 bg-[#00a0e3] hover:bg-[#008bc7] text-white font-bold py-2 px-5 rounded-lg text-sm transition-colors shadow-md shadow-blue-200"
              >
                Ver
              </button>
            </div>

            {/* Right Column: Team */}
            <div className="flex flex-col items-center gap-3 text-center border-t lg:border-t-0 border-gray-100 py-6 lg:py-0">
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-400 mb-1">
                <span className="material-symbols-outlined text-2xl">groups</span>
              </div>
              <h3 className="text-xl font-bold text-[#111118]">Nuestro Equipo</h3>
              <p className="text-[#5f5f8c] text-sm lg:text-base font-medium leading-relaxed text-justify">
              Contamos con docentes certificados en educación inicial bilingüe, capacitados en metodologías modernas y con vocación por el cuidado infantil.
              </p>
            </div>

          </div>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projectItems.map((item) => (
            <div 
              key={item.id} 
              className={`
                relative bg-white p-4 rounded-2xl border transition-all duration-300 group
                flex flex-col items-center text-center justify-center h-full min-h-[140px]
                hover:-translate-y-1 hover:shadow-lg
                ${item.borderColor} ${item.hoverBorder} ${item.shadow}
              `}
            >
              {/* Icon Circle or Image */}
              {item.image ? (
                <div 
                  className="relative w-14 h-14 rounded-full flex items-center justify-center overflow-hidden mb-3 transition-all duration-300 ease shadow-sm group-hover:scale-[2.5] group-hover:z-10 group-hover:shadow-xl"
                  style={{ backgroundColor: '#FFF3E0' }}
                >
                  <img 
                    src={item.image} 
                    alt={item.text}
                    className="h-9 w-auto object-contain"
                  />
                </div>
              ) : (
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center 
                  text-2xl shadow-sm mb-3 transition-transform duration-500 group-hover:scale-110
                  ${item.bg} ${item.color}
                `}>
                  <span className="material-symbols-outlined">{item.icon}</span>
                </div>
              )}

              {/* Text */}
              <h3 className={`text-base font-bold uppercase tracking-tight ${item.color} max-w-xs leading-tight`}>
                {item.text}
              </h3>
              
              {/* Subtitle (if exists) */}
              {item.subtitle && (
                <p className={`text-sm font-medium ${item.color} mt-1 opacity-80`}>
                  {item.subtitle}
                </p>
              )}
              
              {/* Background Decoration */}
              <div className={`absolute top-3 right-3 w-2 h-2 rounded-full ${item.bg} opacity-50`}></div>
              <div className={`absolute bottom-3 left-3 w-1.5 h-1.5 rounded-full ${item.bg} opacity-30`}></div>
            </div>
          ))}
        </div>

          </div>
        </div>
      </div>
      
      <TeachersModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  );
}
