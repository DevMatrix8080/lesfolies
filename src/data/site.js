export const contatti = {
  telefono: '+39 348 528 6211',
  telHref: 'tel:+393485286211',
  whatsapp: 'https://wa.me/393485286211',
  whatsappMsg:
    'https://wa.me/393485286211?text=Ciao%20Les%20Folies!%20Vorrei%20informazioni%20su%20un%20trattamento.',
  email: 'info@lesfoliesjesolo.it',
  indirizzoCorto: 'Piazza Nicolò Tommaseo, 2A · Lido di Jesolo',
  instagram: 'https://www.instagram.com/lesfoliesestetica_jesolo/',
  facebook: 'https://www.facebook.com/lesfoliesestetica/',
};

export const menu = [
  { to: '/', label: 'Home' },
  { to: '/chi-siamo', label: 'Chi siamo' },
  { to: '/servizi', label: 'Servizi' },
  { to: '/contatti', label: 'Contatti' },
];

// giorno: 0 = domenica … 6 = sabato (come Date.getDay)
export const orari = [
  { giorno: 1, label: 'Lunedì', ore: '13:00 – 19:00' },
  { giorno: 2, label: 'Martedì', ore: '10:00 – 19:00' },
  { giorno: 3, label: 'Mercoledì', ore: '10:00 – 19:00' },
  { giorno: 4, label: 'Giovedì', ore: '10:00 – 19:00' },
  { giorno: 5, label: 'Venerdì', ore: '10:00 – 19:00' },
  { giorno: 6, label: 'Sabato', ore: '10:00 – 17:00' },
  { giorno: 0, label: 'Domenica', ore: 'Chiuso' },
];
