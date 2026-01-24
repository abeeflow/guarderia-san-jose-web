import { useState } from 'react';

interface Event {
  id: number;
  title: string;
  date: string;
  month: string;
  time: string;
  description: string;
  image: string;
  gallery: string[];
}

const events: Event[] = [
  {
    id: 1,
    title: "Dia de Puertas Abiertas",
    date: "15",
    month: "Sep",
    time: "10:00 AM - 02:00 PM",
    description: "Una oportunidad para que los nuevos padres recorran nuestras instalaciones y conozcan a nuestro personal docente.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLlwwybaHGEyvoBj5R_e3sRloDNsdgZgGpNBdgGdfOlYHxIjEVcQoA21Vz42BUhtzr76M1vYopiwpDgwb1SGH7H3xC3eQzKzzwPoQesB940F-lgloRKXpX507HZY3QmXhG0H1pEGSlA_IKOi_6iUpM7rQkU81P8UE-LKO_URU7yTitOBvmQQ2yXOxe021QlDRChKANkXhGUh3b2Dhq0PHQ8HrxKiTNz7OQZtYfSR_a82tJ015SpJhz99qzgafhVEh0cPj4543seC9y",
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCLlwwybaHGEyvoBj5R_e3sRloDNsdgZgGpNBdgGdfOlYHxIjEVcQoA21Vz42BUhtzr76M1vYopiwpDgwb1SGH7H3xC3eQzKzzwPoQesB940F-lgloRKXpX507HZY3QmXhG0H1pEGSlA_IKOi_6iUpM7rQkU81P8UE-LKO_URU7yTitOBvmQQ2yXOxe021QlDRChKANkXhGUh3b2Dhq0PHQ8HrxKiTNz7OQZtYfSR_a82tJ015SpJhz99qzgafhVEh0cPj4543seC9y",
      "/programas_1.png",
      "/programas_2.png"
    ]
  },
  {
    id: 2,
    title: "Festival de Otono 2024",
    date: "05",
    month: "Oct",
    time: "Evento de Todo el Dia",
    description: "Celebrando la temporada con juegos tradicionales, comida y actividades comunitarias.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAf6Ww7nZIIvWcPuh3l5OY2wJQoCvcaHoevMoj2ikkeZObpjTYi9VHpME35Iu5fXdzXPWu5l3p2YAs2P7Xa8EOMgEEPBi5zrCJVvkWmCmDlQx6B2a5Pyqx7eSKDM5HXUwcElkYh8b2KLNshaSqoZsFSaAF6ee4MrkKYpCDUwwAt-efPSSc3iwK5GNJBuwR83218Z_q0L8jBmsHJTfC_MxBb6ISn3Becew0tWA6R1yhtNzwziAq4Eyrx50BtcnVHNkuLJhA8tgskyf9E",
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAf6Ww7nZIIvWcPuh3l5OY2wJQoCvcaHoevMoj2ikkeZObpjTYi9VHpME35Iu5fXdzXPWu5l3p2YAs2P7Xa8EOMgEEPBi5zrCJVvkWmCmDlQx6B2a5Pyqx7eSKDM5HXUwcElkYh8b2KLNshaSqoZsFSaAF6ee4MrkKYpCDUwwAt-efPSSc3iwK5GNJBuwR83218Z_q0L8jBmsHJTfC_MxBb6ISn3Becew0tWA6R1yhtNzwziAq4Eyrx50BtcnVHNkuLJhA8tgskyf9E",
      "/programas_3.png",
      "/programas_4.png"
    ]
  },
  {
    id: 3,
    title: "Taller para Padres",
    date: "22",
    month: "Oct",
    time: "06:00 PM - 07:30 PM",
    description: "Una sesion vespertina enfocada en la adquisicion del lenguaje bilingue en el hogar.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4UIknyZyaTKYq2UF8oMbo08MPohmDcr-xPaGq3AqH2CRJI7dlncBXQItDtNT4Pcz3yDMeeV_EPSpcfZl26KakSMrkyxlfImqdTB70fNC-g6LN8QQTiyIEY9s5UNpJJfI-UA854B-2dOsxyer0sEBcMWdvIcYhWC702xSOc-3nGInNtfrcpdxWKvtZJ27mqFo2XT08IYBw_eYXW8IBaxzyVDFiofDT7yGP3fyR9zlfcYkn3nOL7UbGhQ2gyV85PrbF1fNUnW8jH0JB",
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC4UIknyZyaTKYq2UF8oMbo08MPohmDcr-xPaGq3AqH2CRJI7dlncBXQItDtNT4Pcz3yDMeeV_EPSpcfZl26KakSMrkyxlfImqdTB70fNC-g6LN8QQTiyIEY9s5UNpJJfI-UA854B-2dOsxyer0sEBcMWdvIcYhWC702xSOc-3nGInNtfrcpdxWKvtZJ27mqFo2XT08IYBw_eYXW8IBaxzyVDFiofDT7yGP3fyR9zlfcYkn3nOL7UbGhQ2gyV85PrbF1fNUnW8jH0JB",
      "/programas_1.png",
      "/programas_4.png"
    ]
  },
  {
    id: 4,
    title: "Feria de Ciencias Pequeños Genios",
    date: "10",
    month: "Nov",
    time: "09:00 AM - 01:00 PM",
    description: "Nuestros pequeños científicos presentan sus primeros descubrimientos y experimentos creativos.",
    image: "/img_portada_1.png",
    gallery: [
      "/img_portada_1.png",
      "/programas_2.png",
      "/programas_3.png"
    ]
  },
  {
    id: 5,
    title: "Celebración Navideña",
    date: "20",
    month: "Dic",
    time: "05:00 PM - 08:00 PM",
    description: "Una tarde mágica llena de villancicos, teatro y la visita especial de Santa Claus.",
    image: "/img_portada_2.png",
    gallery: [
      "/img_portada_2.png",
      "/programas_1.png",
      "/programas_4.png"
    ]
  },
  {
    id: 6,
    title: "Día del Niño",
    date: "30",
    month: "Abr",
    time: "09:00 AM - 01:00 PM",
    description: "Juegos inflables, payasos y mucha diversión para celebrar a los reyes del hogar.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLlwwybaHGEyvoBj5R_e3sRloDNsdgZgGpNBdgGdfOlYHxIjEVcQoA21Vz42BUhtzr76M1vYopiwpDgwb1SGH7H3xC3eQzKzzwPoQesB940F-lgloRKXpX507HZY3QmXhG0H1pEGSlA_IKOi_6iUpM7rQkU81P8UE-LKO_URU7yTitOBvmQQ2yXOxe021QlDRChKANkXhGUh3b2Dhq0PHQ8HrxKiTNz7OQZtYfSR_a82tJ015SpJhz99qzgafhVEh0cPj4543seC9y",
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCLlwwybaHGEyvoBj5R_e3sRloDNsdgZgGpNBdgGdfOlYHxIjEVcQoA21Vz42BUhtzr76M1vYopiwpDgwb1SGH7H3xC3eQzKzzwPoQesB940F-lgloRKXpX507HZY3QmXhG0H1pEGSlA_IKOi_6iUpM7rQkU81P8UE-LKO_URU7yTitOBvmQQ2yXOxe021QlDRChKANkXhGUh3b2Dhq0PHQ8HrxKiTNz7OQZtYfSR_a82tJ015SpJhz99qzgafhVEh0cPj4543seC9y",
      "/programas_1.png",
      "/programas_2.png"
    ]
  },
  {
    id: 7,
    title: "Graduación Preescolar",
    date: "15",
    month: "Jul",
    time: "10:00 AM - 12:00 PM",
    description: "Ceremonia de graduación para nuestros pequeños que avanzan a la escuela primaria.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAf6Ww7nZIIvWcPuh3l5OY2wJQoCvcaHoevMoj2ikkeZObpjTYi9VHpME35Iu5fXdzXPWu5l3p2YAs2P7Xa8EOMgEEPBi5zrCJVvkWmCmDlQx6B2a5Pyqx7eSKDM5HXUwcElkYh8b2KLNshaSqoZsFSaAF6ee4MrkKYpCDUwwAt-efPSSc3iwK5GNJBuwR83218Z_q0L8jBmsHJTfC_MxBb6ISn3Becew0tWA6R1yhtNzwziAq4Eyrx50BtcnVHNkuLJhA8tgskyf9E",
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAf6Ww7nZIIvWcPuh3l5OY2wJQoCvcaHoevMoj2ikkeZObpjTYi9VHpME35Iu5fXdzXPWu5l3p2YAs2P7Xa8EOMgEEPBi5zrCJVvkWmCmDlQx6B2a5Pyqx7eSKDM5HXUwcElkYh8b2KLNshaSqoZsFSaAF6ee4MrkKYpCDUwwAt-efPSSc3iwK5GNJBuwR83218Z_q0L8jBmsHJTfC_MxBb6ISn3Becew0tWA6R1yhtNzwziAq4Eyrx50BtcnVHNkuLJhA8tgskyf9E",
      "/programas_3.png",
      "/programas_4.png"
    ]
  },
  {
    id: 8,
    title: "Día de la Familia",
    date: "05",
    month: "Mar",
    time: "09:00 AM - 02:00 PM",
    description: "Un día de convivencia familiar con picnic, juegos y actividades deportivas.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4UIknyZyaTKYq2UF8oMbo08MPohmDcr-xPaGq3AqH2CRJI7dlncBXQItDtNT4Pcz3yDMeeV_EPSpcfZl26KakSMrkyxlfImqdTB70fNC-g6LN8QQTiyIEY9s5UNpJJfI-UA854B-2dOsxyer0sEBcMWdvIcYhWC702xSOc-3nGInNtfrcpdxWKvtZJ27mqFo2XT08IYBw_eYXW8IBaxzyVDFiofDT7yGP3fyR9zlfcYkn3nOL7UbGhQ2gyV85PrbF1fNUnW8jH0JB",
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC4UIknyZyaTKYq2UF8oMbo08MPohmDcr-xPaGq3AqH2CRJI7dlncBXQItDtNT4Pcz3yDMeeV_EPSpcfZl26KakSMrkyxlfImqdTB70fNC-g6LN8QQTiyIEY9s5UNpJJfI-UA854B-2dOsxyer0sEBcMWdvIcYhWC702xSOc-3nGInNtfrcpdxWKvtZJ27mqFo2XT08IYBw_eYXW8IBaxzyVDFiofDT7yGP3fyR9zlfcYkn3nOL7UbGhQ2gyV85PrbF1fNUnW8jH0JB",
      "/programas_1.png",
      "/programas_4.png"
    ]
  }
];

export default function EventsSection() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const openModal = (event: Event) => {
    setSelectedEvent(event);
    setCurrentImageIndex(0);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedEvent(null);
    document.body.style.overflow = 'auto';
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedEvent) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedEvent.gallery.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedEvent) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedEvent.gallery.length) % selectedEvent.gallery.length);
    }
  };

  const nextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % Math.ceil(events.length / 3));
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + Math.ceil(events.length / 3)) % Math.ceil(events.length / 3));
  };

  const visibleEvents = events.slice(currentSlideIndex * 3, (currentSlideIndex + 1) * 3);

  return (
    <>
      <section className="min-h-screen flex flex-col justify-center py-20 bg-white scroll-mt-[81px]" id="events">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl font-extrabold tracking-tight">Eventos Realizados</h2>
              <p className="text-[#5f5f8c]">Revive los momentos más especiales de nuestra comunidad educativa.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {visibleEvents.map((event) => (
              <div 
                key={event.id} 
                className="bg-white rounded-xl overflow-hidden border border-gray-100 group shadow-sm cursor-pointer hover:shadow-lg transition-all animate-fade-in-zoom"
                onClick={() => openModal(event)}
              >
                <div 
                  className="h-48 bg-center bg-cover overflow-hidden" 
                  style={{backgroundImage: `url("${event.image}")`}}
                >
                  <div className="m-4 bg-white/90 backdrop-blur rounded-lg p-2 w-14 text-center">
                    <p className="text-xs font-black uppercase text-gray-500">{event.month}</p>
                    <p className="text-xl font-black text-primary leading-none">{event.date}</p>
                  </div>
                </div>
                <div className="p-6 flex flex-col gap-3">
                  <h4 className="text-lg font-bold group-hover:text-primary transition-colors">{event.title}</h4>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">schedule</span> {event.time}
                  </p>
                  <p className="text-sm text-[#5f5f8c] line-clamp-2">{event.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <button 
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white hover:border-primary transition-colors shadow-sm"
              disabled={events.length <= 3}
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button 
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white hover:border-primary transition-colors shadow-sm"
              disabled={events.length <= 3}
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={closeModal}>
          <div 
            className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-fade-in-zoom"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="p-8 lg:p-12">
              <h3 className="text-3xl font-extrabold text-[#111118] mb-2">{selectedEvent.title}</h3>
              <p className="text-sm font-bold text-primary uppercase tracking-wider mb-8">
                {selectedEvent.month} {selectedEvent.date}
              </p>

              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Carousel */}
                <div className="flex flex-col gap-4">
                  <div className="relative group rounded-2xl overflow-hidden aspect-video bg-gray-100 shadow-sm">
                    <img 
                      src={selectedEvent.gallery[currentImageIndex]} 
                      alt={`Gallery ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover transition-all duration-500"
                    />
                  </div>
                  
                  {/* Controls & Indicators */}
                  {selectedEvent.gallery.length > 1 && (
                    <div className="flex items-center justify-center gap-4 mt-2">
                      <button 
                        onClick={prevImage}
                        className="w-10 h-10 bg-white border border-gray-200 hover:bg-gray-50 rounded-full flex items-center justify-center shadow-sm text-gray-700 hover:text-primary transition-all"
                      >
                        <span className="material-symbols-outlined">chevron_left</span>
                      </button>

                      <div className="flex justify-center gap-2">
                        {selectedEvent.gallery.map((_, idx) => (
                          <div 
                            key={idx}
                            className={`h-2 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'bg-primary w-8' : 'bg-gray-300 w-2'}`}
                          />
                        ))}
                      </div>

                      <button 
                        onClick={nextImage}
                        className="w-10 h-10 bg-white border border-gray-200 hover:bg-gray-50 rounded-full flex items-center justify-center shadow-sm text-gray-700 hover:text-primary transition-all"
                      >
                        <span className="material-symbols-outlined">chevron_right</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex flex-col gap-6">
                  <div>
                    <h4 className="font-bold text-[#111118] mb-2 flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary">schedule</span>
                      Horario
                    </h4>
                    <p className="text-[#5f5f8c]">{selectedEvent.time}</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#111118] mb-2 flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary">description</span>
                      Detalles del Evento
                    </h4>
                    <p className="text-[#5f5f8c] leading-relaxed">
                      {selectedEvent.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}