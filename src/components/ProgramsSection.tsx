import { useState } from 'react';
import ProgramModal, { type ProgramDetail } from './ProgramModal';

const programs: ProgramDetail[] = [
  {
    id: 1,
    title: "Educación Temprana",
    age: "De 0 meses a 1 año",
    image: "/programas_1.png",
    description: "Desarrollo sensorial temprano y apego seguro para bebes con acompañamiento de sus padres.",
    icon: "child_care",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
    fullDescription:
      "Nuestro programa de Educación Temprana está diseñado para bebés de 0 a 12 meses junto a sus padres o cuidadores. Trabajamos el desarrollo sensorial, el fortalecimiento del vínculo afectivo y las primeras experiencias de socialización en un espacio seguro y cálido, respetando el ritmo individual de cada bebé.",
    methodology:
      "Sesiones guiadas por docentes especializados en estimulación temprana, con actividades multisensoriales (texturas, sonidos, colores) y ejercicios neuromotores adaptados a cada etapa del primer año de vida.",
    includes: [
      { icon: "psychology", text: "Estimulación sensorial y neurológica" },
      { icon: "favorite", text: "Fortalecimiento del vínculo padre-hijo" },
      { icon: "music_note", text: "Estimulación musical y auditiva" },
      { icon: "self_improvement", text: "Ejercicios de psicomotricidad temprana" },
      { icon: "groups", text: "Socialización con otros bebés" },
      { icon: "monitor_heart", text: "Seguimiento del desarrollo individual" },
    ],
  },
  {
    id: 2,
    title: "Cuna",
    age: "1 y 2 años",
    image: "/programas_2.png",
    description: "Exploración Sensorial y desarrollo neuromotor a través de un vinculo afectivo y seguro.",
    icon: "baby_changing_station",
    iconColor: "text-indigo-600",
    iconBg: "bg-indigo-50",
    fullDescription:
      "El programa de Cuna acompaña a los niños de 1 y 2 años en una etapa clave de exploración y descubrimiento. Fomentamos la autonomía, el lenguaje inicial y el desarrollo neuromotor en un entorno afectivo y seguro, con actividades que respetan su curiosidad natural y fortalecen su confianza.",
    methodology:
      "Aprendizaje a través del juego libre y dirigido, con rutinas estructuradas que brindan seguridad emocional. Los docentes utilizan estrategias de estimulación sensorial, cuentos, canciones y materiales concretos adaptados a esta etapa.",
    includes: [
      { icon: "directions_run", text: "Psicomotricidad y coordinación corporal" },
      { icon: "palette", text: "Actividades sensoriales y artísticas" },
      { icon: "translate", text: "Introducción al bilingüismo (inglés)" },
      { icon: "music_note", text: "Clases de música y ritmo" },
      { icon: "restaurant", text: "Alimentación saludable supervisada" },
      { icon: "volunteer_activism", text: "Programa Crecemos en Valores" },
    ],
  },
  {
    id: 3,
    title: "Jardín",
    age: "De 3 a 5 años",
    image: "/programas_3.png",
    description: "Desarrollo integral de los niños mediante el juego fortaleciendo la autonomía, el lenguaje, el pensamiento lógico, la expresión emocional y la convivencia.",
    icon: "school",
    iconColor: "text-green-600",
    iconBg: "bg-green-50",
    fullDescription:
      "El programa de Jardín prepara a los niños de 3 a 5 años para su desarrollo integral mediante el juego, la exploración y el aprendizaje significativo. Fortalecemos la autonomía, el pensamiento lógico, la expresión emocional y las habilidades sociales, integrando la educación bilingüe en inglés y francés como parte natural de su día a día.",
    methodology:
      "Metodología basada en el aprendizaje lúdico y creativo con enfoque socioemocional. Las actividades combinan proyectos de aula, trabajo colaborativo, rincones de aprendizaje y experiencias concretas que desarrollan competencias cognitivas, lingüísticas y motrices.",
    includes: [
      { icon: "translate", text: "Educación bilingüe: Inglés y Francés" },
      { icon: "calculate", text: "Pensamiento lógico-matemático" },
      { icon: "draw", text: "Lectoescritura y comunicación" },
      { icon: "palette", text: "Artes plásticas y expresión creativa" },
      { icon: "volunteer_activism", text: "Programa Crecemos en Valores" },
      { icon: "neurology", text: "Desarrollo socioemocional" },
    ],
  },
  {
    id: 4,
    title: "Summer School",
    age: "Todas las edades",
    image: "/programas_4.png",
    description: "Talleres con actividades temáticas al aire libre, artes creativas y juegos acuáticos para mantener la mente activa todo el verano.",
    icon: "wb_sunny",
    iconColor: "text-yellow-500",
    iconBg: "bg-yellow-50",
    fullDescription:
      "Nuestro programa de verano ofrece semanas temáticas llenas de diversión y aprendizaje para niños de todas las edades. Combinamos actividades al aire libre, artes creativas, juegos acuáticos y dinámicas de idiomas para que los niños disfruten el verano mientras mantienen su mente activa y desarrollan nuevas habilidades.",
    methodology:
      "Cada semana gira en torno a un tema diferente con talleres prácticos, juegos cooperativos y actividades recreativas. El enfoque es lúdico y flexible, promoviendo la creatividad, el trabajo en equipo y el contacto con la naturaleza.",
    includes: [
      { icon: "pool", text: "Juegos acuáticos y recreativos" },
      { icon: "palette", text: "Talleres de artes creativas" },
      { icon: "park", text: "Actividades al aire libre" },
      { icon: "language", text: "Juegos de idiomas (inglés)" },
      { icon: "theater_comedy", text: "Expresión corporal y teatro" },
      { icon: "event", text: "Inscripción semanal flexible" },
    ],
  },
];

export default function ProgramsSection() {
  const [selectedProgram, setSelectedProgram] = useState<ProgramDetail | null>(null);

  return (
    <section className="min-h-screen min-h-[100vh] w-full flex flex-col bg-white pt-[80px] overflow-hidden scroll-mt-0" id="programs">
      <div className="flex-1 w-full overflow-visible">
        <div className="min-h-full flex flex-col justify-center items-center py-4 sm:py-6 md:py-8 lg:py-10 xl:py-12">
          <div className="max-w-[1280px] w-full mx-auto px-6 lg:px-10">
        {/* Header de la sección */}
        <div className="flex flex-col items-center text-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <div className="relative">
            <h2 className="text-[#111118] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Nuestros Programas Educativos
            </h2>
            <div className="absolute -bottom-2 sm:-bottom-3 md:-bottom-4 left-1/2 transform -translate-x-1/2 w-1/2 h-1 bg-blue-700 rounded-full"></div>
          </div>

          <p className="text-[#5f5f8c] text-sm sm:text-base md:text-lg leading-relaxed max-w-4xl mt-2 sm:mt-3 md:mt-4 text-justify md:text-center">
            Nuestros programas educativos están diseñados para acompañar el desarrollo integral de los niños
            desde sus primeros meses de vida. Brindamos Educación Temprana, Cuna, Jardín y Guardería, en un
            entorno seguro, donde se promueven el aprendizaje, el juego, la autonomía y los valores, respetando
            el ritmo y las necesidades de cada niño.
          </p>
        </div>

        {/* Grid de Programas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
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
                <button
                  onClick={() => setSelectedProgram(program)}
                  className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all group-hover:text-blue-700 cursor-pointer"
                >
                  Saber más
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
        </div>
      </div>

      <ProgramModal
        program={selectedProgram}
        isOpen={selectedProgram !== null}
        onClose={() => setSelectedProgram(null)}
      />
    </section>
  );
}
