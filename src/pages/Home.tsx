import { useState } from 'react';
import EventsSection from '../components/EventsSection';
import EducationalProjectSection from '../components/EducationalProjectSection';
import ProgramsSection from '../components/ProgramsSection';
import { Instagram, Music2, Facebook } from 'lucide-react';

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
      <div className="relative w-full flex items-center justify-center overflow-hidden" id="home" style={{ marginTop: '0px', height: 'calc(100vh - 80px)' }}>
        
        {/* Background Layer Split - Absolute to ensure full coverage */}
        <div className="absolute inset-0 flex z-0 pointer-events-none">
          <div className="w-full md:w-[65%] h-full relative">
             <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("/img_portada_1.png")' }}></div>
             <div className="absolute inset-0 bg-black/10"></div>
          </div>
          <div className="w-[35%] h-full relative hidden md:block">
             <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("/img_portada_2.png")' }}></div>
             <div className="absolute inset-0 bg-primary/10 backdrop-grayscale-[50%]"></div>
          </div>
        </div>

        {/* Floating Main Card - Centered */}
        <div className="relative z-20 w-full max-w-[1200px] h-full flex items-center justify-center p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6">
          <div className="bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-2xl flex flex-col lg:flex-row overflow-hidden w-full border border-white/50 relative" style={{ maxHeight: 'calc(100vh - 120px)' }}>
             
             {/* Text Content (Left Side of Card / Top on Mobile) */}
             <div className="flex-1 p-3 sm:p-4 md:p-5 lg:p-6 xl:p-8 flex flex-col justify-center gap-1.5 sm:gap-2 md:gap-2.5 lg:gap-3 xl:gap-3.5 min-h-0">
                <div className="flex-shrink-0">
                  <span className="inline-block px-2 py-0.5 sm:px-2.5 sm:py-0.5 md:px-3 md:py-1 lg:px-3.5 lg:py-1 bg-blue-50 text-primary text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs font-black uppercase tracking-widest rounded-full w-max border border-blue-100 mb-1 sm:mb-1.5 md:mb-2 lg:mb-2.5">
                    DONDE TODO COMIENZA
                  </span>
                  <h1 className="text-[#111118] text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-black leading-[1.1] tracking-tight">
                    Sus Primeros Pasos hacia un <br className="hidden md:block" />
                    <span className="text-primary">Futuro Brillante</span>
                  </h1>
                </div>
                
                <p className="text-[#5f5f8c] text-[10px] sm:text-[11px] md:text-xs lg:text-sm xl:text-base leading-relaxed font-medium max-w-xl flex-shrink-0">
                  Ofrecemos un ambiente seguro y acogedor, donde apoyamos el desarrollo integral de los niños y niñas en sus primeros años.
                </p>
                

                <div className="pt-0 flex-shrink-0">
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-serif italic text-primary tracking-wide">
                    "Donde su niño es lo más importante"
                  </p>
                </div>

                {/* Certifications Logos */}
                <div className="flex items-center justify-center gap-1 sm:gap-1.5 md:gap-2 lg:gap-2.5 xl:gap-3 mt-1 sm:mt-1.5 md:mt-2 lg:mt-2.5 pt-2 sm:pt-2.5 md:pt-3 lg:pt-3.5 xl:pt-4 border-t border-gray-100 px-1 sm:px-1.5 md:px-2 flex-shrink-0">
                  <img 
                    src="/ministerio.png" 
                    alt="Ministerio de Educación" 
                    className="h-5 sm:h-6 md:h-7 lg:h-8 xl:h-10 2xl:h-12 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity flex-shrink-0"
                  />
                  <img 
                    src="/certificado_1.png" 
                    alt="Certificación 1" 
                    className="h-5 sm:h-6 md:h-7 lg:h-8 xl:h-10 2xl:h-12 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity flex-shrink-0"
                  />
                  <img 
                    src="/certificado_2.png" 
                    alt="Certificación 2" 
                    className="h-5 sm:h-6 md:h-7 lg:h-8 xl:h-10 2xl:h-12 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity flex-shrink-0"
                  />
                </div>
             </div>

             {/* Image Content (Right Side of Card / Bottom on Mobile) */}
             <div className="w-full lg:w-[45%] h-[150px] sm:h-[180px] md:h-[220px] lg:h-auto relative flex-shrink-0">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("/img_portada_3.png")' }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
             </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <ProgramsSection />

      {/* Educational Project Section */}
      <EducationalProjectSection />

      <EventsSection />

      {/* Contact Information Section */}
      <section id="contact" className="bg-background-light py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <h2 className="text-3xl font-extrabold tracking-tight">Visitanos</h2>
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
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary">share</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="font-bold">Síguenos</p>
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                      <a 
                        href="https://www.instagram.com/guarderiajardin.sanjose?igsh=Mmx3dDRzNXlhaXB5" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors"
                      >
                        <Instagram size={18} className="text-primary" />
                        <span>Instagram</span>
                      </a>
                      <a 
                        href="https://www.tiktok.com/@guarderiajardin.sanjose?_r=1&_t=ZS-93x3oQ94rT6" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors"
                      >
                        <Music2 size={18} className="text-primary" />
                        <span>TikTok</span>
                      </a>
                      <a 
                        href="https://www.facebook.com/guarderiajardinsanjose" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors"
                      >
                        <Facebook size={18} className="text-primary" />
                        <span>Facebook</span>
                      </a>
                    </div>
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