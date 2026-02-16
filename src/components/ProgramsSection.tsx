import { Link } from 'react-router-dom';

const programs = [
  {
    id: 1,
    title: "Educación Temprana",
    age: "De 0 meses a 1 año",
    image: "/programas_1.png",
    description: "Desarrollo sensorial temprano y apego seguro para bebes con acompañamiento de sus padres.",
    icon: "child_care",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50"
  },
  {
    id: 2,
    title: "Cuna",
    age: "1 y 2 años",
    image: "/programas_2.png",
    description: "Exploración Sensorial y desarrollo neuromotor a través de un vinculo afectivo y seguro.",
    icon: "baby_changing_station", // Icono aproximado, ajustaremos si hay uno mejor
    iconColor: "text-indigo-600",
    iconBg: "bg-indigo-50"
  },
  {
    id: 3,
    title: "Jardín",
    age: "De 3 a 5 años",
    image: "/programas_3.png",
    description: "Desarrollo integral de los niños mediante el juego fortaleciendo la autonomía, el lenguaje, el pensamiento lógico, la expresión emocional y la convivencia.",
    icon: "school",
    iconColor: "text-green-600",
    iconBg: "bg-green-50"
  },
  {
    id: 4,
    title: "Summer School",
    age: "Todas las edades",
    image: "/programas_4.png",
    description: "Talleres con actividades temáticas al aire libre, artes creativas y juegos acuáticos para mantener la mente activa todo el verano.",
    icon: "wb_sunny",
    iconColor: "text-yellow-500",
    iconBg: "bg-yellow-50"
  }
];

export default function ProgramsSection() {
  return (
    <section className="min-h-screen w-full flex flex-col bg-white pt-[80px] overflow-hidden scroll-mt-0" id="programs">
      <div className="flex-1 w-full overflow-visible">
        <div className="min-h-full flex flex-col justify-center items-center py-8 lg:py-12">
          <div className="max-w-[1280px] w-full mx-auto px-6 lg:px-10">
        {/* Header de la sección */}
        <div className="flex flex-col items-center text-center gap-6 mb-12">
          <div className="relative">
            <h2 className="text-[#111118] text-3xl lg:text-5xl font-extrabold tracking-tight">
              Nuestros Programas Educativos
            </h2>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-1/2 h-1 bg-blue-700 rounded-full"></div>
          </div>
          
          <p className="text-[#5f5f8c] text-lg leading-relaxed max-w-4xl mt-4 text-justify md:text-center">
            Nuestros programas educativos están diseñados para acompañar el desarrollo integral de los niños 
            desde sus primeros meses de vida. Brindamos Educación Temprana, Cuna, Jardín y Guardería, en un 
            entorno seguro, donde se promueven el aprendizaje, el juego, la autonomía y los valores, respetando 
            el ritmo y las necesidades de cada niño.
          </p>
        </div>

        {/* Grid de Programas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programs.map((program) => (
            <div key={program.id} className="flex flex-col gap-4 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 group">
              
              {/* Encabezado de la tarjeta: Icono y Títulos */}
              <div className="flex items-start gap-4 mb-2">
                <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${program.iconBg} ${program.iconColor} shrink-0`}>
                  <span className="material-symbols-outlined text-2xl">{program.icon}</span>
                </div>
                <div className="flex flex-col">
                  <h3 className="text-[#111118] text-xl font-bold leading-tight">{program.title}</h3>
                  <p className="text-[#5f5f8c] text-xs font-semibold uppercase tracking-wide mt-1">
                    {program.age}
                  </p>
                </div>
              </div>

              {/* Imagen */}
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-md group-hover:shadow-lg transition-all my-2">
                <img 
                  src={program.image} 
                  alt={program.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Descripción */}
              <div className="flex-1">
                <p className="text-[#5f5f8c] text-sm leading-relaxed text-justify">
                  {program.description}
                </p>
              </div>

              {/* Botón Saber más */}
              <div className="mt-4 pt-2">
                <Link to="/enrollment" className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all group-hover:text-blue-700">
                  Saber más 
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
        </div>
      </div>
    </section>
  );
}
