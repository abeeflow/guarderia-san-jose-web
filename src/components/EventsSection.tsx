import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, FileText, Calendar } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface DBEvent {
  id: number;
  titulo: string;
  fecha_even: string;
  categoria: string;
  descripcion: string;
  img_portada: string | null;
  img_album: string | string[] | null;
}

interface DisplayEvent extends DBEvent {
  gallery: string[];
  day: string;
  month: string;
  formattedDate: string;
}

export default function EventsSection() {
  const [events, setEvents] = useState<DisplayEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<DisplayEvent | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data, error } = await supabase
          .from('eventos')
          .select('*')
          .order('fecha_even', { ascending: false });

        if (error) throw error;

        if (data) {
          const processedEvents = data.map((event: DBEvent) => {
            // Process Gallery
            let albumImages: string[] = [];
            if (typeof event.img_album === 'string') {
              try {
                albumImages = JSON.parse(event.img_album);
              } catch (e) {
                console.error('Error parsing album images', e);
              }
            } else if (Array.isArray(event.img_album)) {
              albumImages = event.img_album;
            }
            
            const gallery = [
              event.img_portada || '', 
              ...albumImages
            ].filter(Boolean);

            // Process Date
            const dateObj = new Date(event.fecha_even);
            // Spanish months for the badge
            const months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
            
            return {
              ...event,
              gallery,
              day: dateObj.getDate().toString(),
              month: months[dateObj.getMonth()],
              formattedDate: new Intl.DateTimeFormat('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }).format(dateObj)
            };
          });
          setEvents(processedEvents);
        }
      } catch (error) {
        console.error('Error loading events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const openModal = (event: DisplayEvent) => {
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

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Cargando eventos...</div>;
  }

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
                  style={{backgroundImage: `url("${event.img_portada}")`}}
                >
                  <div className="m-4 bg-white/90 backdrop-blur rounded-lg p-2 w-14 text-center">
                    <p className="text-xs font-black uppercase text-gray-500">{event.month}</p>
                    <p className="text-xl font-black text-primary leading-none">{event.day}</p>
                  </div>
                </div>
                <div className="p-6 flex flex-col gap-3">
                  <h4 className="text-lg font-bold group-hover:text-primary transition-colors">{event.titulo}</h4>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <Calendar size={16} /> {event.formattedDate}
                  </p>
                  <p className="text-sm text-[#5f5f8c] line-clamp-2">{event.descripcion}</p>
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
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white hover:border-primary transition-colors shadow-sm"
              disabled={events.length <= 3}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={closeModal}>
          <div 
            className="bg-white rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-fade-in-zoom"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors shadow-sm"
            >
              <X size={24} />
            </button>

            <div className="p-8 lg:p-12">
              <h3 className="text-3xl font-extrabold text-[#111118] mb-2">{selectedEvent.titulo}</h3>
              <p className="text-sm font-bold text-primary uppercase tracking-wider mb-8">
                {selectedEvent.month} {selectedEvent.day}
              </p>

              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Carousel */}
                <div className="flex flex-col gap-4">
                  <div className="relative group rounded-2xl overflow-hidden aspect-video bg-gray-50 shadow-sm border border-gray-100">
                    {selectedEvent.gallery.length > 0 ? (
                      <img 
                        src={selectedEvent.gallery[currentImageIndex]} 
                        alt={`Gallery ${currentImageIndex + 1}`}
                        className="w-full h-full object-contain transition-all duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        Sin imágenes
                      </div>
                    )}
                  </div>
                  
                  {/* Controls & Indicators */}
                  {selectedEvent.gallery.length > 1 && (
                    <div className="flex items-center justify-center gap-4 mt-2">
                      <button 
                        onClick={prevImage}
                        className="w-10 h-10 bg-white border border-gray-200 hover:bg-gray-50 rounded-full flex items-center justify-center shadow-sm text-gray-700 hover:text-primary transition-all"
                      >
                        <ChevronLeft size={20} />
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
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex flex-col gap-6">
                  <div>
                    <h4 className="font-bold text-[#111118] mb-2 flex items-center gap-2">
                      <Calendar size={20} className="text-primary" />
                      Fecha
                    </h4>
                    <p className="text-[#5f5f8c] capitalize">{selectedEvent.formattedDate}</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#111118] mb-2 flex items-center gap-2">
                      <FileText size={20} className="text-primary" />
                      Detalles del Evento
                    </h4>
                    <p className="text-[#5f5f8c] leading-relaxed">
                      {selectedEvent.descripcion}
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
