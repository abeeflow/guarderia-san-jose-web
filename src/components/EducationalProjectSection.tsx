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
  }
];

export default function EducationalProjectSection() {
  return (
    <section className="min-h-screen flex flex-col justify-center py-10 lg:py-12 bg-[#f5f5f8] scroll-mt-[81px]" id="educational-project">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        
        {/* Main Title */}
        <div className="text-center mb-6">
          <h2 className="text-[#111118] text-3xl lg:text-4xl font-extrabold tracking-tight">
            Conócenos
          </h2>
        </div>

        {/* Main Top Card */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 lg:p-8 mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-center">
            
            {/* Left Column: Philosophy */}
            <div className="flex flex-col gap-3 text-center lg:text-left">
              <h3 className="text-xl font-bold text-[#111118]">Nuestra Filosofía</h3>
              <p className="text-[#5f5f8c] text-sm lg:text-base font-medium leading-relaxed">
                Somos una guardería bilingüe dedicada a potenciar lo mejor de los más pequeños.
                Ofrecemos un ambiente seguro y estimulante, centrado en el desarrollo integral y felicidad.
              </p>
            </div>

            {/* Middle Column: Team */}
            <div className="flex flex-col items-center gap-2 text-center border-t lg:border-t-0 lg:border-l lg:border-r border-gray-100 py-6 lg:py-0">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 mb-1">
                <span className="material-symbols-outlined text-2xl">diversity_3</span>
              </div>
              <h3 className="text-lg font-bold text-[#111118]">Nuestro Equipo</h3>
              <p className="text-[#5f5f8c] text-sm font-medium">Equipo Docente - Directora</p>
              
              <button className="mt-2 bg-[#00a0e3] hover:bg-[#008bc7] text-white font-bold py-2 px-5 rounded-lg text-sm transition-colors shadow-md shadow-blue-200">
                Tour Virtual
              </button>
            </div>

            {/* Right Column: Facilities */}
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-400 mb-1">
                <span className="material-symbols-outlined text-2xl">domain</span>
              </div>
              <h3 className="text-lg font-bold text-[#111118]">Nuestras Instalaciones</h3>
              <div className="text-[#5f5f8c] text-sm font-medium">
                <p>Aulas Modernas y Seguras</p>
                <p>Áreas de Juego al Aire Libre</p>
              </div>
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
              {/* Icon Circle */}
              <div className={`
                w-12 h-12 rounded-full flex items-center justify-center 
                text-2xl shadow-sm mb-3 transition-transform duration-500 group-hover:scale-110
                ${item.bg} ${item.color}
              `}>
                <span className="material-symbols-outlined">{item.icon}</span>
              </div>

              {/* Text */}
              <h3 className={`text-base font-bold uppercase tracking-tight ${item.color} max-w-xs leading-tight`}>
                {item.text}
              </h3>
              
              {/* Background Decoration */}
              <div className={`absolute top-3 right-3 w-2 h-2 rounded-full ${item.bg} opacity-50`}></div>
              <div className={`absolute bottom-3 left-3 w-1.5 h-1.5 rounded-full ${item.bg} opacity-30`}></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
