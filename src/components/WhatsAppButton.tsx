import { useState } from 'react';

// Número de WhatsApp - Configurable desde .env (VITE_WHATSAPP_NUMBER)
const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '914477580';

// Mensajes prellenados para cada opción
const MESSAGES = {
  programas: 'Hola Josecito, me gustaría recibir información sobre los programas educativos de la guardería.',
  inscripcion: 'Hola Josecito, quisiera conocer el proceso de inscripción para mi hijo/a.',
  visita: 'Hola Josecito, me gustaría agendar una visita a las instalaciones de la guardería.',
  ubicacion: 'Hola Josecito, ¿podrían indicarme la ubicación exacta de la guardería?',
  generico: 'Hola Josecito, tengo una consulta sobre la Guardería San José.',
};

// Opciones del menú
const OPTIONS = [
  { icon: '📚', label: 'Información de programas', message: MESSAGES.programas },
  { icon: '📝', label: 'Proceso de inscripción', message: MESSAGES.inscripcion },
  { icon: '🏫', label: 'Agendar una visita', message: MESSAGES.visita },
  { icon: '📍', label: 'Ubicación', message: MESSAGES.ubicacion },
];

const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openWhatsApp = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Panel de chat */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="bg-primary p-4 flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Josecito"
              className="w-12 h-12 rounded-full bg-white p-1 object-contain"
            />
            <div className="text-white">
              <h3 className="font-bold text-lg">Josecito</h3>
              <p className="text-sm text-white/90">Asistente Virtual</p>
            </div>
          </div>

          {/* Contenido del chat */}
          <div className="p-4 bg-primary/10">
            {/* Burbuja de mensaje de bienvenida */}
            <div className="bg-white rounded-lg p-3 shadow-sm max-w-[90%] relative">
              <div className="absolute -left-2 top-3 w-0 h-0 border-t-8 border-t-transparent border-r-8 border-r-white border-b-8 border-b-transparent"></div>
              <p className="text-gray-800 text-sm">
                ¡Hola! 👋 Soy <strong>Josecito</strong>, el asistente virtual de la Guardería San José.
              </p>
              <p className="text-gray-800 text-sm mt-2">
                ¿En qué puedo ayudarte hoy?
              </p>
            </div>
          </div>

          {/* Opciones */}
          <div className="p-4 space-y-2 bg-gray-50">
            {OPTIONS.map((option, index) => (
              <button
                key={index}
                onClick={() => openWhatsApp(option.message)}
                className="w-full flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:bg-primary/5 hover:border-primary transition-all duration-200 text-left group"
              >
                <span className="text-xl">{option.icon}</span>
                <span className="text-gray-700 text-sm font-medium group-hover:text-primary transition-colors">
                  {option.label}
                </span>
              </button>
            ))}

            {/* Botón escribir mensaje */}
            <button
              onClick={() => openWhatsApp(MESSAGES.generico)}
              className="w-full mt-3 p-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Escribir mensaje
            </button>
          </div>

          {/* Footer */}
          <div className="px-4 py-2 bg-gray-100 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Powered by WhatsApp Business
            </p>
          </div>
        </div>
      )}

      {/* Botón flotante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 bg-primary rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 transition-all duration-300 hover:scale-110 ${
          !isOpen ? 'animate-bounce-subtle' : ''
        }`}
        aria-label={isOpen ? 'Cerrar chat de WhatsApp' : 'Abrir chat de WhatsApp'}
      >
        {isOpen ? (
          <svg
            className="w-7 h-7 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-8 h-8 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default WhatsAppButton;
