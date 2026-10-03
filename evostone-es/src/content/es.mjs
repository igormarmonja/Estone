/* Español — мова за замовчуванням (корінь сайту). Вичитати носієм перед запуском. */
export default {
  meta: {
    htmlLang: 'es',
    ogLocale: 'es_ES',
    title: 'Encimeras y piedra a medida en Alicante | Taller en Novelda · ESTONE',
    description: 'Encimeras de cocina y baño, lavabos, revestimiento gran formato, escaleras, muebles y corte waterjet. Taller propio en Novelda: medimos, fabricamos e instalamos en la Costa Blanca.',
  },

  a11y: { skip: 'Saltar al contenido', menu: 'Menú', close: 'Cerrar', lang: 'Idioma' },

  nav: {
    products: 'Productos', collection: 'Colección', materials: 'Materiales',
    process: 'Proceso', projects: 'Proyectos', pros: 'Profesionales', contact: 'Contacto',
    cta: 'Presupuesto',
  },

  price: (p) => {
    if (!p) return 'Precio bajo presupuesto';
    const u = { m2: '/m²', pc: '', step: '/peldaño', ml: '/ml' }[p.unit];
    return `desde ${p.from} €${u}`;
  },
  priceNote: 'Precios orientativos sin IVA. El precio final depende del material, las medidas y la instalación.',

  materialNames: {
    quartz: 'Cuarzo', porcelain: 'Porcelánico', natural: 'Piedra natural',
    solid: 'Solid surface', metal: 'Metal', glass: 'Vidrio',
  },

  preloader: 'Taller de piedra · Novelda',

  hero: {
    label: 'Taller propio en Novelda · Alicante',
    h1: ['Piedra', 'a medida'],
    h1Tail: 'desde Novelda, la capital del mármol',
    sub: 'Encimeras, lavabos, revestimientos y piezas únicas. Medimos, fabricamos e instalamos en toda la Costa Blanca.',
    cta: 'Pedir presupuesto',
    whatsapp: 'Escríbenos por WhatsApp',
    trust: ['14 años de oficio', 'Taller propio', 'Instalación propia', 'ES · EN · RU · UA'],
    scroll: 'Desliza',
    imgAlt: 'Encimera de piedra fabricada por ESTONE',
  },

  manifesto: {
    label: 'Estudio',
    text: 'Cada pieza empieza con una medición exacta y termina instalada por las mismas manos que la cortaron. Sin intermediarios, sin juntas innecesarias y con un plazo que te damos antes de empezar.',
    stats: [
      { n: 14, suffix: '', label: 'años trabajando la piedra' },
      { n: 4,  suffix: '', label: 'materiales, una sola responsabilidad' },
      { n: 1,  suffix: '', label: 'equipo de la medición al montaje' },
    ],
  },

  products: {
    label: 'Productos',
    h2: ['Todo en piedra,', 'bajo un mismo techo'],
    intro: 'De la encimera de la cocina a una escultura para el jardín. Elige una línea para ver detalles.',
    more: 'Ver más',
    quote: 'Presupuesto para esto',
    items: {
      kitchen: {
        title: 'Encimeras de cocina',
        line: 'Encimeras a medida con fregadero integrado, isla y frontal a juego.',
        tags: ['Cuarzo', 'Porcelánico', 'Mármol', 'Solid surface'],
        text: 'Medimos la cocina ya montada y fabricamos la encimera para que encaje sin ajustes en obra. Fregadero, frontal y peto del mismo material, en un solo color.',
        bullets: ['Grosores de 12 a 40 mm y cantos a elegir', 'Fregadero bajo encimera o integrado sin juntas', 'Islas, barras y penínsulas de una sola pieza', 'Frontal y alféizares a juego'],
      },
      bath: {
        title: 'Baño: encimeras y lavabos',
        line: 'Lavabos de piedra sin juntas, de colección o diseñados para tu baño.',
        tags: ['4 colecciones propias', 'A medida'],
        text: 'Encimeras con lavabo integrado, desagüe oculto de ranura y muebles revestidos del mismo material. Cuatro colecciones propias y piezas diseñadas desde cero.',
        bullets: ['Lavabo integrado sin juntas', 'Desagüe oculto de ranura', 'Platos de ducha y frentes de bañera', 'Mueble y encimera como un solo volumen'],
      },
      cladding: {
        title: 'Revestimiento gran formato',
        line: 'Paredes, suelos y fachadas con placas de hasta 3,2 × 1,6 m, casi sin juntas.',
        tags: ['Porcelánico', 'Sinterizado', 'Mármol'],
        text: 'Placas XXL cortadas a la medida exacta de la pared: una ducha, una chimenea o toda una fachada con la veta continua de una placa a otra.',
        bullets: ['Paredes de ducha y baño completo', 'Chimeneas y paredes de salón', 'Suelos y escaleras a juego', 'Fachadas ventiladas'],
      },
      stairs: {
        title: 'Escaleras',
        line: 'Peldaños, zanquines y escaleras voladas cortados a la medida exacta.',
        tags: ['Mármol', 'Granito', 'Porcelánico'],
        text: 'Cada peldaño se mide y se corta para su sitio. Escaleras rectas, de caracol y voladas, con antideslizante y luz integrada.',
        bullets: ['Peldaños y tabicas de una pieza', 'Escaleras voladas y de caracol', 'Ranura antideslizante', 'Iluminación LED integrada'],
      },
      furniture: {
        title: 'Mobiliario de piedra',
        line: 'Mesas, islas, consolas y bancos. La piedra como mueble, no como superficie.',
        tags: ['Mármol', 'Travertino', 'Porcelánico'],
        text: 'Mesas de comedor, de centro y de exterior, consolas y bancos. Diseñamos la pieza contigo o fabricamos según el plano de tu interiorista.',
        bullets: ['Mesas de comedor y de centro', 'Mesas y bancos de exterior', 'Consolas y estanterías', 'Recepciones y barras para negocios'],
      },
      sculpture: {
        title: 'Esculturas y piezas únicas',
        line: 'Esculturas, chimeneas y objetos tallados con CNC y a mano.',
        tags: ['CNC', 'Talla a mano'],
        text: 'Piezas que no salen de un catálogo: esculturas, fuentes, chimeneas, rótulos y relieves. Modelamos en 3D, tallamos con CNC y terminamos a mano.',
        bullets: ['Esculturas de interior y jardín', 'Chimeneas y portales', 'Relieves, rótulos y logotipos', 'Fuentes y elementos de agua'],
      },
      cutting: {
        title: 'Corte a medida',
        line: 'Cortamos, perfilamos y pulimos tu material o el nuestro.',
        tags: ['Puente de corte', 'CNC', 'Pulido'],
        text: 'Servicio de corte para particulares, carpinterías y otros talleres. Trae tu placa o elígela con nosotros: cortamos a plano, hacemos cantos, huecos y pulido.',
        bullets: ['Corte recto e inglete', 'Huecos de fregadero y placa', 'Cantos y pulido', 'Trabajo a plano DWG / DXF'],
      },
      waterjet: {
        title: 'Corte por chorro de agua',
        line: 'Waterjet para formas imposibles: marquetería, logotipos, rosetones.',
        tags: ['Waterjet', 'Cualquier material'],
        text: 'El chorro de agua corta piedra, porcelánico, vidrio y metal sin calentar ni astillar. Ideal para incrustaciones, formas curvas y piezas de precisión.',
        bullets: ['Marquetería e incrustaciones', 'Logotipos y rótulos', 'Formas curvas y calados', 'Piedra, porcelánico, vidrio, metal'],
      },
    },
    end: { title: '¿No ves lo que buscas?', text: 'Si se puede hacer en piedra, lo hacemos. Mándanos una foto o un boceto.', cta: 'Cuéntanos tu idea' },
  },

  collection: {
    label: 'Colección de lavabos',
    h2: ['Cuatro colecciones,', 'cuatro artistas'],
    intro: 'Nuestros lavabos llevan el nombre de pintores. Cada serie tiene su propio carácter, y cada modelo se fabrica a la medida de tu baño.',
    models: 'modelos',
    view: 'Ver modelos',
    series: {
      leonardo: 'Piedra natural, vidrio y cuarzo combinados en piezas de autor.',
      monet: 'Solid surface sin juntas: la encimera fluye hacia el lavabo.',
      kazimir: 'Geometría pura con desagüe oculto de ranura.',
      salvador: 'Formas orgánicas pensadas para la estancia, no para el catálogo.',
    },
    sinks: {
      'LE-01': 'Lavabo ovalado con desagüe oculto: fondo y encimera al mismo nivel, sin escalón.',
      'LE-02': 'Cuenco tallado en un solo bloque de mármol. Tú eliges la piedra y la forma: no hay dos iguales.',
      'LE-03': 'Encimera dividida en zonas para ordenar el espacio de forma cómoda y segura.',
      'LE-04': 'Cuenco redondo de vidrio con fondo de mármol integrado. La piedra se puede iluminar desde dentro.',
      'LE-05': 'Cuenco cuadrado: laterales de vidrio y fondo de mármol o cuarzo.',
      'LE-06': 'Cuenco de mármol sobre pedestal del mismo color, con una sola veta continua.',
      'MO-01': 'La «concha»: el óvalo queda enrasado con la encimera, sin borde ni junta. Cuatro anchos.',
      'MO-02': 'La «barca»: fondo curvo como un casco. El agua va sola al desagüe desde cualquier punto.',
      'MO-03': 'Concha evolucionada: la encimera se convierte en lavabo sin ninguna junta.',
      'MO-04': 'Para baños pequeños: el lavabo ocupa solo parte de la placa, el resto es balda.',
      'MO-05': 'Baño de invitados sin sitio para mueble: un cubo suspendido en la pared.',
      'KA-01': 'Encimera-lavabo clásica con desagüe de ranura y gran pendiente.',
      'KA-02': 'Desagüe de ranura y cubeta rebajada; zonas de apoyo a ambos lados.',
      'KA-03': 'Lavabo exento de bordes finos para aseo de invitados o taller.',
      'KA-04': 'Desagüe de ranura con zona de trabajo; grifo lateral, nada cuelga sobre el lavabo.',
      'KA-05': 'Doble lavabo con zona personal entre ambos, rebajada respecto a la superficie.',
      'KA-06': 'Encimera asimétrica con dos lavabos a distinta altura y baldas a diferentes niveles.',
      'KA-07': 'Encimera y mueble como un monolito, revestidos de porcelánico en un solo color.',
      'KA-08': 'Doble encimera que apoya sobre el mueble sin vuelo: piedra y madera al mismo plano.',
      'SA-01': 'Lavabo orgánico sin un solo ángulo recto. Su contorno nunca se repite.',
      'SA-02': 'La encimera que lava: sin cubeta, el plano se inclina suavemente hacia el desagüe.',
      'SA-03': 'Placa de 50 mm, fina como una encimera. Solo un campo de surcos delata el lavabo.',
      'SA-04': 'La forma la decidió la habitación: lavabo, balda y curva adaptados al espacio.',
    },
  },

  materials: {
    label: 'Materiales',
    h2: ['Cuatro materiales,', 'un mismo cuidado'],
    intro: 'Te ayudamos a elegir según el uso, no según la moda. Puedes venir al taller y ver las placas en persona.',
    items: {
      quartz: { line: 'El estándar para la cocina.', props: ['No absorbe líquidos', 'Resiste manchas y arañazos', 'Sin mantenimiento'] },
      porcelain: { line: 'Calor, sol y exterior.', props: ['Resiste el calor directo', 'Apto para exterior', 'Placas XXL de hasta 3,2 m'] },
      natural: { line: 'Cada placa es única.', props: ['Mármol, granito, travertino', 'Seleccionado en Novelda', 'Envejece con carácter'] },
      solid: { line: 'Sin juntas visibles.', props: ['Formas curvas', 'Lavabo integrado', 'Reparable en casa'] },
    },
    marquee: ['Cuarzo', 'Porcelánico', 'Mármol', 'Solid surface', 'Granito', 'Travertino'],
    cta: '¿Cuál elegir? Te lo explicamos en 5 minutos por WhatsApp',
  },

  process: {
    label: 'Proceso',
    h2: ['De la medición', 'a la instalación'],
    steps: [
      { t: 'Medición', d: 'Medimos en tu casa con láser o plantilla, sobre los muebles ya montados.' },
      { t: 'Diseño', d: 'Plano técnico y elección de la placa contigo. Puedes venir al taller a verla.' },
      { t: 'Fabricación', d: 'Corte, CNC y pulido en nuestro taller de Novelda. Sin subcontratas.' },
      { t: 'Instalación', d: 'Nuestro equipo monta, sella y deja todo limpio. Un solo responsable.' },
    ],
    note: 'Te damos el plazo exacto antes de empezar.',
  },

  projects: {
    label: 'Proyectos',
    h2: ['Trabajos', 'recientes'],
    intro: 'Una muestra de lo que sale del taller. Pronto, más proyectos en la Costa Blanca.',
    view: 'Ver',
    items: ['Cocina · Cuarzo', 'Baño · Solid surface', 'Escalera · Mármol', 'Revestimiento · Porcelánico', 'Mesa · Travertino', 'Lavabo · Piedra natural'],
  },

  pros: {
    label: 'Profesionales',
    h2: ['Tu taller', 'en Novelda'],
    intro: 'Para cocinas, interioristas, arquitectos, promotoras y otros talleres. Fabricamos a plano, con plazos fijos.',
    rows: [
      { t: 'Corte y waterjet para terceros', d: 'Tu material o el nuestro, en plazo.' },
      { t: 'Fabricación a plano', d: 'Recibimos DWG, DXF o PDF acotado.' },
      { t: 'Muestras y visitas al taller', d: 'Elige la placa con tu cliente.' },
      { t: 'Tarifa profesional', d: 'Precios y plazos fijos para cada proyecto.' },
    ],
    cta: 'Hablar con el taller',
    chip: 'Profesional',
  },

  faq: {
    label: 'Preguntas',
    h2: ['Lo que más', 'nos preguntan'],
    items: [
      { q: '¿Cuánto cuesta una encimera de cuarzo a medida?', a: (P) => `Una encimera de cocina empieza ${P.kitchen ? `desde ${P.kitchen.from} €/m²` : 'con presupuesto'}. El precio final depende del material, el grosor, los cantos, los huecos y la instalación. Con las medidas aproximadas te damos un precio en 24 horas.` },
      { q: '¿Trabajáis en toda la provincia de Alicante?', a: () => 'Sí: Alicante, Elche, Novelda, Benidorm, Torrevieja, Jávea, Dénia y toda la Costa Blanca. También Murcia y Valencia bajo consulta.' },
      { q: '¿Cuánto se tarda desde la medición hasta la instalación?', a: () => 'Depende del proyecto y del material. Te damos el plazo exacto antes de empezar y lo cumplimos.' },
      { q: '¿Puedo ir al taller a elegir la placa?', a: () => 'Claro. Estamos en Novelda; pide cita por teléfono o WhatsApp y te enseñamos las placas disponibles.' },
      { q: '¿Cortáis material que traiga yo?', a: () => 'Sí. Hacemos corte, cantos, huecos, pulido y corte por chorro de agua sobre tu propio material.' },
      { q: '¿Habláis inglés o ruso?', a: () => 'Sí. Te atendemos en español, inglés, ruso y ucraniano.' },
    ],
  },

  contact: {
    label: 'Contacto',
    h2: ['Hablemos', 'de tu proyecto'],
    intro: 'Cuéntanos qué necesitas. Te respondemos con un precio orientativo en 24 horas.',
    form: {
      name: 'Nombre', phone: 'Teléfono o WhatsApp', what: '¿Qué necesitas?',
      measures: 'Medidas o comentario', measuresPh: 'Por ejemplo: encimera en L, 3,2 + 1,8 m, cuarzo blanco',
      consent: 'Acepto la política de privacidad y que me contactéis sobre mi solicitud.',
      submit: 'Enviar solicitud', sending: 'Enviando…',
      okTitle: 'Recibido', okText: 'Te escribimos en breve. Si tienes fotos o planos, mándalos por WhatsApp.',
      error: 'No se ha podido enviar. Escríbenos por WhatsApp o llámanos.',
      photoHint: '¿Tienes fotos o planos? Envíalos por WhatsApp',
    },
    other: 'Otro',
    whatsapp: 'WhatsApp', call: 'Teléfono', email: 'Email', address: 'Taller',
    hours: 'Lun–Vie · 8:00–18:00', visit: 'Visitas al taller con cita', map: 'Cómo llegar',
  },

  footer: {
    tagline: 'Taller de piedra a medida en Novelda, Alicante.',
    legal: ['Aviso legal', 'Privacidad', 'Cookies'],
    ua: 'ESTONE Ucrania',
    rights: 'Todos los derechos reservados.',
  },

  drawer: { close: 'Cerrar', quote: 'Pedir presupuesto', gallery: 'Fotos' },
  ph: 'Foto próximamente',
};
