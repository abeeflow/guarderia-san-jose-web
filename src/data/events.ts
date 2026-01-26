export interface Event {
  id: number;
  title: string;
  date: string;
  month: string;
  time: string;
  description: string;
  image: string;
  gallery: string[];
}

export const initialEvents: Event[] = [
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
  }
];
