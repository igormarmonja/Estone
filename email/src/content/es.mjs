/* Español — основна мова розсилки. Тексти-приклад: перед кожною розсилкою міняємо
   hero, manifesto і visit. Вичитати носієм перед запуском. */
export default {
  htmlLang: 'es',
  subject: 'Lavabos sin juntas, recién salidos del taller',
  preheader: 'Cuatro colecciones de lavabos de piedra, fabricadas a medida en Novelda.',

  top: { issue: 'Nº', webview: 'Ver en el navegador' },

  hero: {
    label: 'Taller propio en Novelda · Alicante',
    h1: ['Piedra', 'a medida'],
    tail: 'desde Novelda, la capital del mármol',
    sub: 'Este mes: lavabos sin juntas y encimeras que se convierten en lavabo. Medimos, fabricamos e instalamos en toda la Costa Blanca.',
    cta: 'Pedir presupuesto',
    whatsapp: 'WhatsApp',
    trust: ['14 años de oficio', 'Taller propio', 'Instalación propia'],
    imgAlt: 'Encimera de piedra fabricada por ESTONE',
  },

  manifesto: {
    label: 'Estudio',
    hello: (name) => `Hola, ${name}:`,
    text: 'Cada pieza empieza con una medición exacta y termina instalada por las mismas manos que la cortaron. Sin intermediarios, sin juntas innecesarias y con un plazo que te damos antes de empezar.',
    stats: [
      { n: '14', label: 'años trabajando la piedra' },
      { n: '4',  label: 'materiales, una sola responsabilidad' },
      { n: '1',  label: 'equipo de la medición al montaje' },
    ],
  },

  collection: {
    label: 'Colección de lavabos',
    h2: ['Cuatro colecciones,', 'cuatro artistas'],
    intro: 'Nuestros lavabos llevan el nombre de pintores. Cada modelo se fabrica a la medida de tu baño.',
    models: 'modelos',
    view: 'Ver modelos',
    series: {
      leonardo: 'Piedra natural, vidrio y cuarzo combinados en piezas de autor.',
      monet: 'Solid surface sin juntas: la encimera fluye hacia el lavabo.',
      kazimir: 'Geometría pura con desagüe oculto de ranura.',
      salvador: 'Formas orgánicas pensadas para la estancia, no para el catálogo.',
    },
  },

  products: {
    label: 'Productos',
    h2: ['Todo en piedra,', 'bajo un mismo techo'],
    items: {
      kitchen: 'Encimeras de cocina',
      bath: 'Baño: encimeras y lavabos',
      cladding: 'Revestimiento gran formato',
      stairs: 'Escaleras',
    },
    price: (p) => {
      if (!p) return 'Bajo presupuesto';
      const u = { m2: '/m²', pc: '', step: '/peldaño', ml: '/ml' }[p.unit];
      return `desde ${p.from} €${u}`;
    },
    note: 'Precios orientativos sin IVA. El precio final depende del material, las medidas y la instalación.',
    all: 'Ver todos los productos',
  },

  materials: {
    label: 'Materiales',
    h2: ['Cuatro materiales,', 'un mismo cuidado'],
    marquee: ['Cuarzo', 'Porcelánico', 'Mármol', 'Solid surface'],
    items: [
      { t: 'Cuarzo', d: 'El estándar para la cocina. No absorbe líquidos, sin mantenimiento.' },
      { t: 'Porcelánico', d: 'Calor, sol y exterior. Placas XXL de hasta 3,2 m.' },
      { t: 'Piedra natural', d: 'Cada placa es única. Seleccionada en Novelda.' },
      { t: 'Solid surface', d: 'Sin juntas visibles. Formas curvas y lavabo integrado.' },
    ],
    cta: '¿Cuál elegir? Te lo explicamos por WhatsApp',
  },

  process: {
    label: 'Proceso',
    h2: ['De la medición', 'a la instalación'],
    steps: [
      { t: 'Medición', d: 'Medimos en tu casa con láser o plantilla, sobre los muebles ya montados.' },
      { t: 'Diseño', d: 'Plano técnico y elección de la placa contigo.' },
      { t: 'Fabricación', d: 'Corte, CNC y pulido en nuestro taller de Novelda. Sin subcontratas.' },
      { t: 'Instalación', d: 'Nuestro equipo monta, sella y deja todo limpio.' },
    ],
  },

  visit: {
    label: 'Visitas al taller',
    h2: ['Ven a ver', 'las placas'],
    text: 'Elige la placa en persona, con la luz del día y el canto en la mano. Pide cita y te enseñamos el taller.',
    cta: 'Pedir cita por WhatsApp',
  },

  contact: {
    label: 'Contacto',
    h2: ['Hablemos', 'de tu proyecto'],
    intro: 'Responde a este email o escríbenos. Te damos un precio orientativo en 24 horas.',
    whatsapp: 'WhatsApp', call: 'Teléfono', email: 'Email', address: 'Taller',
    hours: 'Lun–Vie · 8:00–18:00',
    cta: 'Pedir presupuesto',
  },

  footer: {
    tagline: 'Taller de piedra a medida en Novelda, Alicante.',
    why: 'Recibes este email porque te suscribiste en evostone.es o nos pediste un presupuesto.',
    unsubscribe: 'Darse de baja',
    web: 'Web',
  },
};
