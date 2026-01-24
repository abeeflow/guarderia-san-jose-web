import EventsSection from '../components/EventsSection';
import ProgramsSection from '../components/ProgramsSection';
import EducationalProjectSection from '../components/EducationalProjectSection';

export default function Home() {


  return (
    <main className="flex-1">
      {/* Hero Section */}
      <div id="hero" className="relative w-full min-h-screen flex overflow-hidden">
        {/* Background Layer Split */}
        <div className="w-[65%] relative">
           <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("/img_portada_1.png")' }}></div>
           <div className="absolute inset-0 bg-black/10"></div>
        </div>
        <div className="w-[35%] relative hidden md:block">
           <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("/img_portada_2.png")' }}></div>
           <div className="absolute inset-0 bg-primary/10 backdrop-grayscale-[50%]"></div>
        </div>

        {/* Floating Main Card */}
        <div className="absolute inset-0 flex items-center justify-center p-0 lg:p-10 z-20">
          <div className="bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-2xl flex overflow-hidden max-w-[1200px] w-full border border-white/50 relative">
             
             {/* Text Content (Left Side of Card) */}
             <div className="flex-1 p-8 lg:p-16 flex flex-col justify-center gap-6 lg:gap-8" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                <div>
                  <span className="inline-block px-4 py-1.5 bg-blue-50 text-primary text-xs font-black uppercase tracking-widest rounded-full w-max border border-blue-100 mb-4">
                    DONDE TODO COMIENZA
                  </span>
                  <h1 className="text-[#111118] text-4xl lg:text-2xl xl:text-4xl font-black leading-[1.1] tracking-tight">
                    Sus Primeros Pasos hacia un <br className="hidden lg:block" />
                    <span className="text-primary">Futuro Brillante</span>
                  </h1>
                </div>
                
                <div className="text-[#5f5f8c] text-sm md:text-base leading-relaxed font-medium max-w-xl space-y-3">
                  <p>Ofrecemos un ambiente seguro y acogedor, donde apoyamos el desarrollo integral de los niños y niñas en sus primeros años.</p>
                  <p>Nuestra atención se basa en el juego, el afecto y el respeto, promoviendo la autonomía, la creatividad y la convivencia, colaborando estrechamente con las familias para acompañar cada etapa del crecimiento.</p>
                  <p>Nuestro compromiso es formar niños felices, seguros y autónomos, preparándolos para el futuro.</p>
                </div>
                

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
      <ProgramsSection />

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
                    <p className="text-sm text-gray-500">123 Calle Educacion, San Jose, Costa Rica</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary">call</span>
                  </div>
                  <div>
                    <p className="font-bold">Telefono</p>
                    <p className="text-sm text-gray-500">+506 2234-5678</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary">mail</span>
                  </div>
                  <div>
                    <p className="font-bold">Correo Electronico</p>
                    <p className="text-sm text-gray-500">admisiones@sanjosekinder.edu</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-[400px]">
              <div className="w-full h-full bg-gray-200 flex items-center justify-center relative">
                <div 
                  className="absolute inset-0 bg-center bg-cover opacity-50 grayscale" 
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
    </main>
  );
}