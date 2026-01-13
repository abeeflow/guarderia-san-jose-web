import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest rounded-full w-max">
                Excelencia Bilingue
              </span>
              <h1 className="text-[#111118] text-4xl lg:text-6xl font-black leading-tight tracking-[-0.03em]">
                Formando Lideres Bilingues para el Manana
              </h1>
              <p className="text-[#5f5f8c] text-lg leading-relaxed max-w-[500px]">
                San Jose Bilingual Kindergarten ofrece un ambiente seguro, profesional e inspirador donde tu hijo puede crecer, aprender y sobresalir en un entorno bilingue.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/enrollment"
                className="flex min-w-[160px] items-center justify-center rounded-lg h-14 px-8 bg-primary text-white text-base font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
              >
                Inscribete Ahora
              </Link>
              <button className="flex min-w-[160px] items-center justify-center rounded-lg h-14 px-8 bg-white border border-gray-200 text-[#111118] text-base font-bold hover:bg-gray-50 transition-colors">
                Programa de Verano
              </button>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <div 
                className="absolute inset-0 bg-center bg-cover" 
                style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBdrkFol8zTcGev2LWMQv6RPE4RDYZMTYHMo9p1encV_k_DwCD_sexYeQCrM-XYT4CK3lNTRrWWNqECwVnaVfneSu0JaXvg0oFtkgygBkCJQpPJAbL4SqmqptzrEnP_ImVH89jmdcJXIg3hgfPM7Ye_NIzI5rTqwx76duX8wmuBVbnzHO-y5q0jCrGRRMSAuv2oPOo9WwX4u2yS9II2tyswgHmFMD4pP5nUYgR3hXkEIwjXGuQuMAkceNV58GtW_74kwY2HjEHDeig3")'}}
              />
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur p-4 rounded-xl flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <span className="material-symbols-outlined text-primary">verified</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase">Instalacion Licenciada</p>
                  <p className="text-sm font-bold">Acreditacion Ministerial</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section id="programs" className="bg-white py-20 border-y border-gray-100">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="flex flex-col items-center text-center mb-16 gap-4">
            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight">Nuestros Programas Principales</h2>
            <p className="text-[#5f5f8c] max-w-2xl">
              Disenados por expertos en educacion para fomentar la adquisicion natural del lenguaje y los hitos de desarrollo holistico desde el nacimiento hasta los seis anos.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Nursery Card */}
            <div className="flex flex-col gap-6 rounded-2xl border border-gray-100 bg-white p-8 hover:shadow-xl hover:border-primary/20 transition-all group">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-50 text-primary group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">child_care</span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold">Guarderia</h3>
                <p className="text-[#5f5f8c] text-sm leading-relaxed">
                  Desarrollo sensorial temprano y vinculacion segura para bebes en un ambiente tranquilo.
                </p>
              </div>
              <a className="mt-auto text-primary text-sm font-bold flex items-center gap-2 group-hover:gap-3 transition-all" href="#">
                Saber mas <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
            
            {/* Pre-K Card */}
            <div className="flex flex-col gap-6 rounded-2xl border border-gray-100 bg-white p-8 hover:shadow-xl hover:border-primary/20 transition-all group">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-orange-50 text-orange-500 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">menu_book</span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold">Pre-Kinder</h3>
                <p className="text-[#5f5f8c] text-sm leading-relaxed">
                  Introduccion a fundamentos bilingues a traves del juego, musica y narracion interactiva.
                </p>
              </div>
              <a className="mt-auto text-primary text-sm font-bold flex items-center gap-2 group-hover:gap-3 transition-all" href="#">
                Saber mas <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
            
            {/* Kindergarten Card */}
            <div className="flex flex-col gap-6 rounded-2xl border border-gray-100 bg-white p-8 hover:shadow-xl hover:border-primary/20 transition-all group">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-green-50 text-green-600 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">school</span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold">Kinder</h3>
                <p className="text-[#5f5f8c] text-sm leading-relaxed">
                  Curriculo avanzado enfocado en alfabetizacion, matematicas y habilidades de liderazgo social.
                </p>
              </div>
              <a className="mt-auto text-primary text-sm font-bold flex items-center gap-2 group-hover:gap-3 transition-all" href="#">
                Saber mas <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
            
            {/* Summer Camp Card */}
            <div className="flex flex-col gap-6 rounded-2xl border border-gray-100 bg-white p-8 hover:shadow-xl hover:border-primary/20 transition-all group">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-yellow-50 text-yellow-600 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">wb_sunny</span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold">Campamento de Verano</h3>
                <p className="text-[#5f5f8c] text-sm leading-relaxed">
                  Actividades tematicas al aire libre y artes creativas para mantener la mente activa todo el verano.
                </p>
              </div>
              <a className="mt-auto text-primary text-sm font-bold flex items-center gap-2 group-hover:gap-3 transition-all" href="#">
                Saber mas <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl font-extrabold tracking-tight">Proximos Eventos</h2>
              <p className="text-[#5f5f8c]">Unete a nuestra comunidad y mantente informado sobre la vida escolar.</p>
            </div>
            <button className="text-primary font-bold flex items-center gap-2 hover:underline">
              Ver Todos los Eventos <span className="material-symbols-outlined">calendar_month</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Event 1 */}
            <div className="bg-white rounded-xl overflow-hidden border border-gray-100 group shadow-sm">
              <div 
                className="h-48 bg-center bg-cover overflow-hidden" 
                style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCLlwwybaHGEyvoBj5R_e3sRloDNsdgZgGpNBdgGdfOlYHxIjEVcQoA21Vz42BUhtzr76M1vYopiwpDgwb1SGH7H3xC3eQzKzzwPoQesB940F-lgloRKXpX507HZY3QmXhG0H1pEGSlA_IKOi_6iUpM7rQkU81P8UE-LKO_URU7yTitOBvmQQ2yXOxe021QlDRChKANkXhGUh3b2Dhq0PHQ8HrxKiTNz7OQZtYfSR_a82tJ015SpJhz99qzgafhVEh0cPj4543seC9y")'}}
              >
                <div className="m-4 bg-white/90 backdrop-blur rounded-lg p-2 w-14 text-center">
                  <p className="text-xs font-black uppercase text-gray-500">Sep</p>
                  <p className="text-xl font-black text-primary leading-none">15</p>
                </div>
              </div>
              <div className="p-6 flex flex-col gap-3">
                <h4 className="text-lg font-bold group-hover:text-primary transition-colors">Dia de Puertas Abiertas</h4>
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">schedule</span> 10:00 AM - 02:00 PM
                </p>
                <p className="text-sm text-[#5f5f8c]">Una oportunidad para que los nuevos padres recorran nuestras instalaciones y conozcan a nuestro personal docente.</p>
              </div>
            </div>
            
            {/* Event 2 */}
            <div className="bg-white rounded-xl overflow-hidden border border-gray-100 group shadow-sm">
              <div 
                className="h-48 bg-center bg-cover overflow-hidden" 
                style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAf6Ww7nZIIvWcPuh3l5OY2wJQoCvcaHoevMoj2ikkeZObpjTYi9VHpME35Iu5fXdzXPWu5l3p2YAs2P7Xa8EOMgEEPBi5zrCJVvkWmCmDlQx6B2a5Pyqx7eSKDM5HXUwcElkYh8b2KLNshaSqoZsFSaAF6ee4MrkKYpCDUwwAt-efPSSc3iwK5GNJBuwR83218Z_q0L8jBmsHJTfC_MxBb6ISn3Becew0tWA6R1yhtNzwziAq4Eyrx50BtcnVHNkuLJhA8tgskyf9E")'}}
              >
                <div className="m-4 bg-white/90 backdrop-blur rounded-lg p-2 w-14 text-center">
                  <p className="text-xs font-black uppercase text-gray-500">Oct</p>
                  <p className="text-xl font-black text-primary leading-none">05</p>
                </div>
              </div>
              <div className="p-6 flex flex-col gap-3">
                <h4 className="text-lg font-bold group-hover:text-primary transition-colors">Festival de Otono 2024</h4>
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">schedule</span> Evento de Todo el Dia
                </p>
                <p className="text-sm text-[#5f5f8c]">Celebrando la temporada con juegos tradicionales, comida y actividades comunitarias.</p>
              </div>
            </div>
            
            {/* Event 3 */}
            <div className="bg-white rounded-xl overflow-hidden border border-gray-100 group shadow-sm">
              <div 
                className="h-48 bg-center bg-cover overflow-hidden" 
                style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC4UIknyZyaTKYq2UF8oMbo08MPohmDcr-xPaGq3AqH2CRJI7dlncBXQItDtNT4Pcz3yDMeeV_EPSpcfZl26KakSMrkyxlfImqdTB70fNC-g6LN8QQTiyIEY9s5UNpJJfI-UA854B-2dOsxyer0sEBcMWdvIcYhWC702xSOc-3nGInNtfrcpdxWKvtZJ27mqFo2XT08IYBw_eYXW8IBaxzyVDFiofDT7yGP3fyR9zlfcYkn3nOL7UbGhQ2gyV85PrbF1fNUnW8jH0JB")'}}
              >
                <div className="m-4 bg-white/90 backdrop-blur rounded-lg p-2 w-14 text-center">
                  <p className="text-xs font-black uppercase text-gray-500">Oct</p>
                  <p className="text-xl font-black text-primary leading-none">22</p>
                </div>
              </div>
              <div className="p-6 flex flex-col gap-3">
                <h4 className="text-lg font-bold group-hover:text-primary transition-colors">Taller para Padres</h4>
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">schedule</span> 06:00 PM - 07:30 PM
                </p>
                <p className="text-sm text-[#5f5f8c]">Una sesion vespertina enfocada en la adquisicion del lenguaje bilingue en el hogar.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                  <p className="font-bold">San Jose Kindergarten</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
