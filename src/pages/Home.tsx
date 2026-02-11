import { useState } from 'react';
import EventsSection from '../components/EventsSection';
import EducationalProjectSection from '../components/EducationalProjectSection';

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
    icon: "baby_changing_station",
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


// Map Modal Component
const MapModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.925574972767!2d-79.0345678250959!3d-8.109075791920392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91ad3d9c79e60515%3A0x6d9678170c2d2871!2sCalle%20Las%20Magnolias%20200-204%2C%20Trujillo%2013008!5e0!3m2!1sen!2spe!4v1706300000000!5m2!1sen!2spe";
  const directMapLink = "https://www.google.com/maps/place/Calle+Las+Magnolias+200-204,+Trujillo+13008";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-3xl w-full max-w-4xl h-[80vh] flex flex-col overflow-hidden shadow-2xl relative animate-fade-in-up" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between bg-white z-10">
          <h3 className="text-lg font-bold text-[#111118] flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">location_on</span>
            Nuestra Ubicación
          </h3>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <span className="material-symbols-outlined text-gray-500 text-sm">close</span>
          </button>
        </div>

        {/* Map Iframe */}
        <div className="flex-1 w-full bg-gray-100 relative">
          <iframe 
            src={mapUrl}
            width="100%" 
            height="100%" 
            style={{border:0}} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps Location"
          ></iframe>
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-gray-500 font-bold hover:bg-gray-200 transition-colors text-sm"
          >
            Cerrar
          </button>
          <a 
            href={directMapLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-colors text-sm flex items-center gap-2 shadow-lg shadow-primary/20"
          >
            Abrir en Google Maps
            <span className="material-symbols-outlined text-sm">open_in_new</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [isMapOpen, setIsMapOpen] = useState(false);


  return (
    <main className="flex-1">
      {/* Hero Section */}
      <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden" id="home">
        
        {/* Background Layer Split - Absolute to ensure full coverage */}
        <div className="absolute inset-0 flex z-0">
          <div className="w-full md:w-[65%] h-full relative">
             <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("/img_portada_1.png")' }}></div>
             <div className="absolute inset-0 bg-black/10"></div>
          </div>
          <div className="w-[35%] h-full relative hidden md:block">
             <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("/img_portada_2.png")' }}></div>
             <div className="absolute inset-0 bg-primary/10 backdrop-grayscale-[50%]"></div>
          </div>
        </div>

        {/* Floating Main Card */}
        <div className="relative z-20 w-full max-w-[1200px] p-4 lg:p-10">
          <div className="bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-2xl flex overflow-hidden w-full border border-white/50 relative min-h-[500px] lg:min-h-[600px]">
             
             {/* Text Content (Left Side of Card) */}
             <div className="flex-1 p-8 lg:p-16 flex flex-col justify-center gap-6 lg:gap-8">
                <div>
                  <span className="inline-block px-4 py-1.5 bg-blue-50 text-primary text-xs font-black uppercase tracking-widest rounded-full w-max border border-blue-100 mb-4">
                    DONDE TODO COMIENZA
                  </span>
                  <h1 className="text-[#111118] text-4xl lg:text-5xl xl:text-6xl font-black leading-[1.1] tracking-tight">
                    Sus Primeros Pasos hacia un <br className="hidden lg:block" />
                    <span className="text-primary">Futuro Brillante</span>
                  </h1>
                </div>
                
                <p className="text-[#5f5f8c] text-lg leading-relaxed font-medium max-w-xl">
                  Ofrecemos un ambiente seguro y acogedor, donde apoyamos el desarrollo integral de los niños y niñas en sus primeros años.
                </p>
                

                <div className="pt-0">
                  <p className="text-2xl lg:text-3xl font-serif italic text-primary tracking-wide">
                    "Donde su niño es lo más importante"
                  </p>
                </div>

                {/* Badge inside card for mobile, hidden on desktop if desired, or kept as detail */}
                <div className="flex items-center gap-3 mt-4 pt-6 border-t border-gray-100">
                   <span className="material-symbols-outlined text-green-500 text-3xl">verified_user</span>
                   <div>
                      <p className="text-xs font-black text-gray-400 uppercase tracking-wider">INSTALACIÓN ACREDITADA</p>
                      <p className="text-sm font-bold text-gray-800">Ministerio de Educación</p>
                   </div>
                </div>
             </div>

             {/* Image Content (Right Side of Card - img_portada_3) */}
             <div className="w-[45%] relative hidden lg:block">
                {/* Slanted divider effect */}
                <div className="absolute inset-y-0 left-0 w-12 bg-white/95 transform -skew-x-6 origin-bottom -ml-6 z-10"></div>
                
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("/img_portada_3.png")' }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
             </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section className="min-h-screen flex flex-col justify-center py-16 lg:py-24 bg-white scroll-mt-[81px]" id="programs">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          {/* Header de la sección */}
          <div className="flex flex-col items-center text-center gap-6 mb-16">
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Educational Project Section */}
      <EducationalProjectSection />

      <EventsSection />

      {/* Contact Information Section */}
      <section id="contact" className="bg-background-light py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <h2 className="text-3xl font-extrabold tracking-tight">Visita Nuestro Campus</h2>
                <p className="text-[#5f5f8c]">Estamos ubicados en el corazon de la ciudad, proporcionando un ambiente seguro y accesible para tus pequenos.</p>
              </div>
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary">location_on</span>
                  </div>
                  <div>
                    <p className="font-bold">Direccion</p>
                    <button 
                      onClick={() => setIsMapOpen(true)}
                      className="text-sm text-gray-500 hover:text-primary transition-colors text-left"
                    >
                      Calle las Magnolias 200-204, Urb. California, Trujillo
                    </button>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary">call</span>
                  </div>
                  <div>
                    <p className="font-bold">Telefono</p>
                    <p className="text-sm text-gray-500">+51 942628995</p>
                    <p className="text-sm text-gray-500">044 281060</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary">mail</span>
                  </div>
                  <div>
                    <p className="font-bold">Correo Electronico</p>
                    <p className="text-sm text-gray-500">guarderiajardinbilinguesanjose@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
            <div 
              className="bg-white rounded-2xl shadow-xl overflow-hidden h-[400px] cursor-pointer hover:shadow-2xl transition-all hover:scale-[1.01] group"
              onClick={() => setIsMapOpen(true)}
            >
              <div className="w-full h-full bg-gray-200 flex items-center justify-center relative">
                <div 
                  className="absolute inset-0 bg-center bg-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-500" 
                  style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCHuy4KvYRzssiaPQHyG1Kp8HahFOTKX4R91snCj3LOaEXX-jDUE8DQNRB6tSzTo9T8Oj9MLNTat3JWIXuJAZj1bVmwnZ5eAXUi0w-P-5sNP4Ps2uPTQkd_9qrK5vfAF5ql12nDRm6Ois1j-D9YT1G_7YrY2kFagcl6xBZo0G-vuhMvmHYD0rE4gPikaMEm7qK0wne01tyeh9q0fRLQ-dzX-7ADjKx4rKuw2cCWzIDeMrLyDwnTY3CIK2xRCJ5v-Jbbh4kNFx4ugdCs")'}}
                />
                <div className="z-10 bg-white p-4 rounded-xl shadow-lg border border-primary/20 flex items-center gap-3">
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                  <p className="font-bold">Guardería Jardín Bilingüe San José</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MapModal isOpen={isMapOpen} onClose={() => setIsMapOpen(false)} />
    </main>
  );
}