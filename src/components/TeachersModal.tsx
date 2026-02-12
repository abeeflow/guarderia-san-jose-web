import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { OptimizedImage } from './OptimizedImage';

interface Installation {
  id: number;
  img_insta: string | null;
  created_at?: string;
}

interface TeachersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TeachersModal({ isOpen, onClose }: TeachersModalProps) {
  const [installations, setInstallations] = useState<Installation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 1;

  useEffect(() => {
    if (isOpen) {
      fetchInstallations();
    }
  }, [isOpen]);

  const fetchInstallations = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('instalaciones')
        .select('id, img_insta, created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInstallations((data || []).filter(inst => inst.img_insta !== null));
    } catch (error) {
      console.error('Error fetching installations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const totalPages = Math.ceil(installations.length / itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const currentInstallations = installations.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#0F172A]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-5xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-300">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="p-6 md:p-8 flex-1 overflow-hidden">
          
          {/* Header */}
          <div className="text-center mb-6">
            
            <h2 className="text-3xl md:text-4xl font-black text-[#1E1B4B]">
              Nuestras Instalaciones
            </h2>
            <div className="w-16 h-1 bg-blue-200 mx-auto mt-3 rounded-full"></div>
          </div>

          {/* Main Content */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
            </div>
          ) : installations.length === 0 ? (
            <div className="text-center text-gray-500 py-12">
              <p>No hay instalaciones disponibles en este momento.</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-full">
              {/* Image Container */}
              {currentInstallations[0]?.img_insta && (
                <div className="relative w-full md:w-[70%] h-[40vh] md:h-[50vh] rounded-xl overflow-hidden shadow-lg bg-gray-50 border border-gray-100 mb-6">
                  <OptimizedImage
                    src={currentInstallations[0].img_insta}
                    alt={`Instalación ${currentInstallations[0].id}`}
                    className="w-full h-full"
                    imageClassName="object-cover w-full h-full"
                  />
                </div>
              )}
            </div>
          )}

        </div>

        {/* Navigation Controls */}
        <div className="p-6 border-t border-gray-50 bg-gray-50/50 flex flex-col items-center justify-center gap-4">
          <div className="flex items-center gap-6">
            <button
              onClick={prevPage}
              disabled={installations.length <= itemsPerPage}
              className={`p-3 rounded-full transition-all ${
                installations.length <= itemsPerPage
                  ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                  : 'bg-white text-gray-700 shadow-md hover:bg-blue-50 hover:text-blue-600 hover:scale-110 active:scale-95'
              }`}
            >
              <ChevronLeft size={24} />
            </button>
            
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`w-2 h-2 rounded-full transition-colors ${
                      idx === currentPage ? 'bg-blue-500' : 'bg-gray-300'
                    } ${installations.length <= itemsPerPage ? 'opacity-0' : 'opacity-100'}`} 
                  />
              ))}
            </div>

            <button
              onClick={nextPage}
              disabled={installations.length <= itemsPerPage}
              className={`p-3 rounded-full transition-all ${
                installations.length <= itemsPerPage
                  ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                  : 'bg-white text-gray-700 shadow-md hover:bg-blue-50 hover:text-blue-600 hover:scale-110 active:scale-95'
              }`}
            >
              <ChevronRight size={24} />
            </button>
          </div>
          
          {/* Quote moved inside footer */}
          <div className="text-center mt-2">
              <p className="text-[10px] text-gray-400 italic">"Donde su niño es lo más importante"</p>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
