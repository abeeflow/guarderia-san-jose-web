import { Link } from 'react-router-dom';

export default function Enrollment() {
  return (
    <main className="flex-1 flex justify-center py-5">
      <div className="flex flex-col max-w-[1024px] flex-1 px-4 md:px-10">
        {/* Breadcrumbs */}
        <nav className="flex flex-wrap gap-2 py-4">
          <Link className="text-[#5f5f8c] text-sm font-medium leading-normal hover:text-primary" to="/">Inicio</Link>
          <span className="text-[#5f5f8c] text-sm font-medium leading-normal">/</span>
          <span className="text-[#111118] text-sm font-medium leading-normal">Inscripciones y Servicios</span>
        </nav>
        
        {/* Page Heading */}
        <div className="flex flex-wrap justify-between items-end gap-3 py-6">
          <div className="flex min-w-72 flex-col gap-3">
            <h1 className="text-[#111118] text-4xl font-black leading-tight tracking-[-0.033em]">
              Inscripciones y Servicios Educativos
            </h1>
            <p className="text-[#5f5f8c] text-lg font-normal leading-normal max-w-2xl">
              Inicia el viaje bilingue de tu hijo con nuestra comunidad profesional y amorosa. Ofrecemos programas integrales disenados para el desarrollo temprano.
            </p>
          </div>
          <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center gap-2 justify-center overflow-hidden rounded-lg h-12 px-6 bg-white border border-gray-200 text-primary text-sm font-bold leading-normal tracking-[0.015em] shadow-sm hover:bg-gray-50 transition-colors">
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span className="truncate">Descargar Prospecto</span>
          </button>
        </div>
        
        {/* Enrollment Section */}
        <section className="mt-8">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-1.5 h-8 bg-primary rounded-full"></span>
            <h2 className="text-primary text-[24px] font-bold leading-tight tracking-[-0.015em]">Programas de Inscripcion</h2>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {/* Regular Enrollment Card */}
            <div className="flex flex-col md:flex-row items-stretch rounded-xl shadow-md bg-white overflow-hidden border border-gray-100">
              <div 
                className="w-full md:w-1/3 min-h-[240px] bg-center bg-no-repeat bg-cover" 
                style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBq5VP_7XYe26-kukhrXISG4Y0ivDIPKz2FMFFM2DEyopNUoRUBRWQfrNjldecn0i4iXD3-gaL0BM8d8_tnaBeder9FDNuZEcdGX8U8Dx_pyUkhmBpEqDsmGIJCI8r7nbgjv8bU0OiMvuiv5_XsHrq1aMiYWH01RscldrKfXsAxmWtz0sbttjdetnyegVps_uP1UsgE0ayor3-Cn9PSdU_izwBvlxQLVucOkaIdqmuuIhtb476P7BQ8n-3eHB6OEWh5K5E2Cwy9r8xb")'}}
              />
              <div className="flex-1 flex flex-col justify-between p-6 md:p-8">
                <div>
                  <p className="text-primary text-sm font-bold uppercase tracking-wider mb-2">Programa Anual</p>
                  <h3 className="text-[#111118] text-2xl font-bold mb-4">Inscripcion Regular (2024-2025)</h3>
                  <div className="space-y-3 text-[#5f5f8c] text-base leading-relaxed">
                    <p>Programa de ano academico completo enfocado en aprendizaje socioemocional e inmersion bilingue.</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-green-500 text-[18px]">check_circle</span> Edades de 1 a 5 anos
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-green-500 text-[18px]">check_circle</span> Acceso Completo al Curriculo
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-green-500 text-[18px]">check_circle</span> Estimulacion Diaria
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-green-500 text-[18px]">check_circle</span> Comidas Saludables Incluidas
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                  <div className="text-[#111118]">
                    <span className="text-xs uppercase font-semibold">Fecha Limite</span>
                    <p className="font-bold">15 de Agosto, 2024</p>
                  </div>
                  <button className="flex min-w-[140px] cursor-pointer items-center justify-center rounded-lg h-11 px-6 bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                    <span>Inscribirse Ahora</span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Summer Enrollment Card */}
            <div className="flex flex-col md:flex-row items-stretch rounded-xl shadow-md bg-white overflow-hidden border border-gray-100">
              <div 
                className="w-full md:w-1/3 min-h-[240px] bg-center bg-no-repeat bg-cover" 
                style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBQhjx8YS4SiKhK7mlhJRZSj83j2I_9ezbwCE4sQkmNVe2F1Z-6HIAKqA2WDBTs_uL1L8nlEJPhldc7_3fPZpx8GGiWgwA9Efz441B5uduhgsttXldFzN7oVgnMP_NT2t4sjtKFgzc_HA8XHCxkoRrKoUb5FpopDqE7zkY1t4NCMuc2kxRVNBEgeG0Lg616Tmse5viYwTycFo8DRl_D4-VRLugVQo8xtO1WvExt51A1t3eeFME0bPuL6Ip4uxJlfaONqNLUg1GOWeDM")'}}
              />
              <div className="flex-1 flex flex-col justify-between p-6 md:p-8">
                <div>
                  <p className="text-primary text-sm font-bold uppercase tracking-wider mb-2">Programa Estacional</p>
                  <h3 className="text-[#111118] text-2xl font-bold mb-4">Campamento de Verano Divertido</h3>
                  <div className="space-y-3 text-[#5f5f8c] text-base leading-relaxed">
                    <p>Un programa de 8 semanas lleno de diversion enfocado en artes creativas, actividades al aire libre y juegos de idiomas.</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-green-500 text-[18px]">check_circle</span> Inscripcion Semanal Flexible
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-green-500 text-[18px]">check_circle</span> Actividades al Aire Libre
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-green-500 text-[18px]">check_circle</span> Desarrollo Artistico
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-green-500 text-[18px]">check_circle</span> Musica y Ritmo
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                  <div className="text-[#111118]">
                    <span className="text-xs uppercase font-semibold">Inicia</span>
                    <p className="font-bold">1 de Junio, 2024</p>
                  </div>
                  <button className="flex min-w-[140px] cursor-pointer items-center justify-center rounded-lg h-11 px-6 bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                    <span>Reservar un Cupo</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Educational Services Grid */}
        <section className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-[#111118] text-3xl font-bold mb-4">Nuestros Servicios Educativos</h2>
            <p className="text-[#5f5f8c] max-w-2xl mx-auto">Proporcionamos un ambiente holistico donde cada talento infantil es nutrido a traves de programas especializados.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Bilingualism */}
            <div className="bg-white p-8 rounded-xl border border-gray-100 text-center flex flex-col items-center group hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                <span className="material-symbols-outlined text-3xl">translate</span>
              </div>
              <h3 className="text-[#111118] text-xl font-bold mb-3">Bilinguismo Natural</h3>
              <p className="text-[#5f5f8c] text-sm leading-relaxed">Exposicion temprana al ingles a traves del juego, narracion y conversacion diaria para una adquisicion sin esfuerzo.</p>
            </div>
            
            {/* Creative Arts */}
            <div className="bg-white p-8 rounded-xl border border-gray-100 text-center flex flex-col items-center group hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                <span className="material-symbols-outlined text-3xl">palette</span>
              </div>
              <h3 className="text-[#111118] text-xl font-bold mb-3">Artes Creativas</h3>
              <p className="text-[#5f5f8c] text-sm leading-relaxed">Desarrollo de habilidades motoras finas y autoexpresion a traves de pintura, manualidades y actividades sensoriales.</p>
            </div>
            
            {/* Early Stimulation */}
            <div className="bg-white p-8 rounded-xl border border-gray-100 text-center flex flex-col items-center group hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                <span className="material-symbols-outlined text-3xl">neurology</span>
              </div>
              <h3 className="text-[#111118] text-xl font-bold mb-3">Estimulacion Temprana</h3>
              <p className="text-[#5f5f8c] text-sm leading-relaxed">Ejercicios neurologicos especializados disenados para construir puentes cognitivos e inteligencia emocional.</p>
            </div>
          </div>
        </section>

        {/* Contact/Inquiry Form */}
        <section className="my-16 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 bg-primary p-10 text-white flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-4">Contactanos</h2>
                <p className="text-white/80 mb-8">Tienes preguntas especificas sobre el proceso de inscripcion? Nuestro equipo de admisiones esta aqui para ayudarte.</p>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined">call</span>
                    <div>
                      <p className="font-bold">Telefono</p>
                      <p className="text-sm text-white/80">+506 2234-5678</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined">mail</span>
                    <div>
                      <p className="font-bold">Correo</p>
                      <p className="text-sm text-white/80">admisiones@sanjosekinder.edu</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined">location_on</span>
                    <div>
                      <p className="font-bold">Direccion</p>
                      <p className="text-sm text-white/80">123 Calle Educacion, San Jose, CR</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-12 flex gap-4">
                <a className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" href="#">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3l-.5 3H13v6.8c4.56-.93 8-4.96 8-9.8z"/></svg>
                </a>
                <a className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" href="#">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12.31 2c-3.265 0-3.674.014-4.956.072-1.278.059-2.151.261-2.915.557a5.875 5.875 0 00-2.126 1.385 5.875 5.875 0 00-1.385 2.126c-.296.764-.498 1.637-.557 2.915C.014 10.326 0 10.735 0 14c0 3.265.014 3.674.072 4.956.059 1.278.261 2.151.557 2.915a5.875 5.875 0 001.385 2.126 5.875 5.875 0 002.126 1.385c.764.296 1.637.498 2.915.557 1.282.058 1.691.072 4.956.072 3.265 0 3.674-.014 4.956-.072 1.278-.059 2.151-.261 2.915-.557a5.875 5.875 0 002.126-1.385 5.875 5.875 0 001.385-2.126c.296-.764.498-1.637.557-2.915.058-1.282.072-1.691.072-4.956 0-3.265-.014-3.674-.072-4.956-.059-1.278-.261-2.151-.557-2.915a5.875 5.875 0 00-1.385-2.126 5.875 5.875 0 00-2.126-1.385c-.764-.296-1.637-.498-2.915-.557C15.674 2.014 15.265 2 12 2h.31zm-1.012 2.162c1.285 0 1.437.005 1.944.028 1.15.052 1.774.244 2.19.406.55.214.943.47 1.355.882.412.412.668.805.882 1.355.162.416.354 1.04.406 2.19.023.507.028.66.028 1.944s-.005 1.437-.028 1.944c-.052 1.15-.244 1.774-.406 2.19-.214.55-.47.943-.882 1.355-.412.412-.805.668-1.355.882-.416.162-1.04.354-2.19.406-.507.023-.66.028-1.944.028s-1.437-.005-1.944-.028c-1.15-.052-1.774-.244-2.19-.406-.55-.214-.943-.47-1.355-.882-.412-.412-.668-.805-.882-1.355-.162-.416-.354-1.04-.406-2.19-.023-.507-.028-.66-.028-1.944s.005-1.437.028-1.944c.052-1.15.244-1.774.406-2.19.214-.55.47-.943.882-1.355.412-.412.805-.668 1.355-.882.416-.162 1.04-.354 2.19-.406.507-.023.66-.028 1.944-.028h1.012zM12 7.75A4.25 4.25 0 1012 16.25 4.25 4.25 0 0012 7.75zM12 14.5a2.25 2.25 0 110-4.5 2.25 2.25 0 010 4.5zm5.75-7.75a1 1 0 11-2 0 1 1 0 012 0z"/></svg>
                </a>
              </div>
            </div>
            <div className="md:w-2/3 p-10">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-[#111118]">Nombre Completo</label>
                    <input 
                      className="w-full h-11 px-4 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" 
                      placeholder="Juan Perez" 
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-[#111118]">Correo Electronico</label>
                    <input 
                      className="w-full h-11 px-4 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" 
                      placeholder="juan@ejemplo.com" 
                      type="email"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-[#111118]">Interes</label>
                  <select className="w-full h-11 px-4 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm">
                    <option>Inscripcion Regular</option>
                    <option>Campamento de Verano</option>
                    <option>Informacion General</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-[#111118]">Mensaje</label>
                  <textarea 
                    className="w-full p-4 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm resize-none" 
                    placeholder="Como podemos ayudarte hoy?" 
                    rows={4}
                  />
                </div>
                <button 
                  className="w-full bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition-all flex items-center justify-center gap-2" 
                  type="submit"
                >
                  <span>Enviar Consulta</span>
                  <span className="material-symbols-outlined text-[18px]">send</span>
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
