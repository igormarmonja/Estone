/* Español — idioma principal (raíz del sitio). Textos del sitio anterior de Gridalta. */
export default {
  meta: {
    htmlLang: 'es',
    ogLocale: 'es_ES',
    title: 'Gridalta — Reformas integrales en Valencia y Costa Blanca | Precio cerrado',
    description: 'Reformas integrales llave en mano en Valencia y Costa Blanca. Presupuesto cerrado por contrato, sin retrasos y con reportes semanales en vídeo. 120+ obras y 7+ años de experiencia.',
  },

  a11y: { skip: 'Saltar al contenido', menu: 'Menú', close: 'Cerrar', lang: 'Idioma' },

  nav: {
    services: 'Servicios', beforeAfter: 'Antes y después', calculator: 'Calculadora',
    projects: 'Proyectos', why: 'Por qué Gridalta', contact: 'Contacto',
    cta: 'Presupuesto',
  },

  preloader: 'Reformas integrales · Valencia',

  hero: {
    label: 'Reformas integrales en Valencia y Costa Blanca',
    h1: ['Reformas', 'sin estrés'],
    h1Tail: 'sin retrasos y con precio cerrado',
    sub: 'Ciclo completo de obra llave en mano: desde licencias y demolición hasta instalaciones, acabados de alta gama y carpintería a medida. Con reportes semanales en vídeo.',
    cta: 'Calcular presupuesto en 2 min',
    whatsapp: 'WhatsApp directo',
    trust: ['Presupuesto cerrado por contrato', 'Plazos garantizados', 'Vídeo cada viernes', 'Equipo propio de 55 especialistas'],
    scroll: 'Desliza',
    imgAlt: 'Baño con porcelánico efecto mármol reformado por Gridalta',
  },

  manifesto: {
    label: 'Nuestra forma de trabajar',
    text: '«El 90% de los problemas en una reforma no vienen de los materiales ni del diseño, sino de personas que no cumplen su palabra. En Gridalta trabajamos de forma humana.»',
    author: 'Serhiy Kuzmyk · Fundador de Gridalta',
    stats: [
      { n: 120, suffix: '+', label: 'obras terminadas: casas, áticos, villas y locales' },
      { n: 7,   suffix: '+', label: 'años especializados en reformas llave en mano' },
      { n: 55,  suffix: '',  label: 'profesionales propios: albañiles, fontaneros, electricistas y carpinteros' },
      { n: 0,   suffix: '€', label: 'sobrecostes imprevistos: contrato cerrado antes de empezar' },
    ],
  },

  services: {
    label: 'Servicios',
    h2: ['Todo tu espacio,', 'un solo equipo'],
    intro: 'Olvídate de buscar fontaneros, albañiles o electricistas que no se coordinan. Nos ocupamos del 100% del proyecto.',
    more: 'Ver más',
    quote: 'Presupuesto para esto',
    items: {
      vivienda: {
        title: 'Reforma integral de viviendas',
        line: 'Pisos antiguos o recién comprados convertidos en espacios luminosos y eficientes.',
        tags: ['Llave en mano', 'Pisos', 'Áticos'],
        text: 'Transformamos pisos antiguos y viviendas recién adquiridas en espacios luminosos, térmicamente eficientes y cómodos para vivir muchas décadas.',
        bullets: ['Derribo y desescombro certificado', 'Redistribución ergonómica de tabiques', 'Nueva instalación de fontanería y electricidad', 'Aislamiento térmico y acústico continuo'],
      },
      cocina: {
        title: 'Cocinas de diseño a medida',
        line: 'Distribuciones prácticas, encimeras resistentes y almacenamiento inteligente.',
        tags: ['Mobiliario a medida', 'Porcelánico', 'Cuarzo'],
        text: 'La cocina es el corazón de la casa. Diseñamos distribuciones prácticas donde todo está a mano, con encimeras resistentes y almacenamiento inteligente.',
        bullets: ['Mobiliario fabricado a medida', 'Encimeras de porcelánico y cuarzo', 'Iluminación LED indirecta bajo muebles', 'Montaje e integración de electrodomésticos'],
      },
      bano: {
        title: 'Baños de bienestar y estilo',
        line: 'De baños oscuros o anticuados a espacios amplios de relajación.',
        tags: ['Ducha a ras de suelo', 'Gran formato'],
        text: 'Convertimos baños oscuros o anticuados en espacios amplios de relajación: duchas a ras de suelo antideslizantes, mamparas a medida y sanitarios suspendidos.',
        bullets: ['Impermeabilización multicapa certificada', 'Platos de resina enrasados a ras de suelo', 'Muebles suspendidos con cajones organizados', 'Grifería termostática empotrada'],
      },
      villa: {
        title: 'Villas y chalets en Costa Blanca',
        line: 'Reformas estructurales, aislamiento para el calor mediterráneo y terrazas.',
        tags: ['Aerotermia', 'Fachadas', 'Exterior'],
        text: 'Reformas estructurales, aislamiento para el calor mediterráneo, sustitución de ventanales para vistas panorámicas y terrazas con piscina.',
        bullets: ['Aluminio minimalista con rotura de puente térmico', 'Aerotermia y suelo radiante frío/calor', 'Pérgolas bioclimáticas y pavimentos exteriores', 'Reforma de fachadas con morteros térmicos'],
      },
      local: {
        title: 'Locales comerciales y oficinas',
        line: 'Cronogramas estrictos para que abras en la fecha fijada.',
        tags: ['Normativa', 'Alta potencia', 'Acústica'],
        text: 'Cada día de retraso en un negocio es dinero perdido. Trabajamos con cronogramas estrictos para que abras en la fecha fijada.',
        bullets: ['Instalaciones para alta potencia eléctrica', 'Insonorización acústica según normativa', 'Acabados de tráfico intenso y alto desgaste', 'Accesibilidad y normativa municipal de apertura'],
      },
      alquiler: {
        title: 'Reforma para alquilar o vender',
        line: 'Puesta a punto que sube el valor del inmueble con una inversión controlada.',
        tags: ['Retorno rápido', 'Exprés'],
        text: 'Intervenciones inteligentes de puesta a punto que multiplican el valor de mercado del inmueble con una inversión controlada y retorno rápido.',
        bullets: ['Actualización exprés de cocinas y baños', 'Pintura neutra y cambio de luminarias LED', 'Suelos vinílicos o laminados continuos', 'Subida del precio de venta o de renta'],
      },
    },
    end: { title: '¿Tu obra es diferente?', text: 'Cuéntanos qué necesitas: si es una reforma, la coordinamos de principio a fin.', cta: 'Hablemos' },
  },

  beforeAfter: {
    label: 'Antes y después',
    h2: ['Obras reales,', 'no renders'],
    intro: 'Desliza para ver el cambio entre el estado durante la obra y el acabado final.',
    before: 'Antes',
    after: 'Gridalta',
    handle: 'Desliza para comparar',
    title: 'Cocina a medida con isla · Valencia',
    text: 'Mobiliario a medida de suelo a techo, isla central con encimera porcelánica, columnas de hornos e iluminación LED integrada.',
    facts: ['Presupuesto cerrado cumplido al 100%', 'Equipo propio de montaje'],
  },

  calculator: {
    label: 'Calculadora',
    h2: ['¿Cuánto cuesta', 'tu reforma?'],
    intro: 'Elige el tipo de inmueble, la superficie y las calidades para ver una estimación realista del mercado en Valencia y Costa Blanca.',
    steps: ['Tipo de inmueble', 'Superficie', 'Calidades y acabados', 'Servicios adicionales'],
    types: {
      apartment: 'Piso o apartamento',
      house: 'Chalet / villa',
      commercial: 'Local / negocio',
      bathKitchen: 'Solo cocina y/o baños',
    },
    areaLabel: 'Metros cuadrados construidos',
    qualities: {
      standard: { t: 'Confort y equilibrio', d: 'Primeras marcas (Roca, Porcelanosa, Climalit), pintura lavable y tarima AC5.' },
      premium:  { t: 'Alta gama y diseño', d: 'Microcemento, porcelánico gran formato, puertas enrasadas y grifería empotrada.' },
      luxury:   { t: 'Exclusivo / obra de autor', d: 'Madera noble, domótica KNX, carpintería oculta y piedra sinterizada.' },
    },
    addons: {
      kitchen: 'Cocina a medida con electrodomésticos',
      furniture: 'Armarios y carpintería a medida',
      licenses: 'Gestión de licencias de obra',
      hvac: 'Climatización por conductos / aerotermia',
    },
    result: 'Inversión aproximada',
    time: 'Plazo estimado',
    weeks: 'semanas',
    note: 'Cálculo orientativo con precios actuales de mano de obra y materiales en Valencia y Alicante. IVA no incluido.',
    whatsapp: 'Consultar por WhatsApp',
    visit: 'Pedir visita técnica gratuita',
    waMsg: 'Hola, he usado la calculadora de gridalta.es:',
  },

  why: {
    label: 'Por qué Gridalta',
    h2: ['Clientes que', 'respiran tranquilos'],
    intro: 'La diferencia entre contratar cuadrillas sueltas o confiar tu vivienda a una constructora con principios.',
    marquee: ['Precio cerrado', 'Plazos por contrato', 'Vídeo cada viernes', 'Equipo propio', 'Garantía 2 años'],
    market: 'Una reforma típica',
    us: 'Con Gridalta',
    rows: [
      { k: 'Presupuesto', bad: 'Presupuesto vago en una hoja. A mitad de obra: «esto no estaba incluido, son 8.000 € más».', good: 'Presupuesto detallado partida por partida. Precio cerrado por contrato: ningún euro extra sin tu firma.' },
      { k: 'Plazos', bad: '«En un mesecito lo tenemos». Pasan 4 meses y los lunes no aparece nadie.', good: 'Fecha de entrega en el contrato. Si nos retrasamos por causas nuestras, te compensamos por cada día.' },
      { k: 'Comunicación', bad: 'Persigues al encargado por teléfono: «mañana te lo miro».', good: 'Chat directo con Serhiy y el jefe de obra. Cada viernes, fotos y vídeos del avance.' },
      { k: 'Equipo', bad: 'Subcontratas desconocidas que rotan según quién esté libre.', good: 'Equipo propio que lleva años trabajando junto, con los mismos estándares de orden y limpieza.' },
      { k: 'Materiales', bad: 'Márgenes ocultos o fines de semana perdidos en tiendas de azulejos.', good: 'Precios de distribuidor de primeras marcas, asesoramiento técnico y entrega en obra.' },
    ],
  },

  projects: {
    label: 'Proyectos',
    h2: ['Obras', 'terminadas'],
    intro: 'Cada proyecto refleja el estilo de vida de su dueño. Nada de soluciones de catálogo: obras a medida hechas con precisión.',
    view: 'Ver',
    items: ['Cocina con isla · Gandía', 'Baño wellness · Dénia', 'Vivienda residencial · Valencia', 'Baño gran formato · Valencia', 'Encimera y perfil LED · Oliva', 'Columnas de cocina · Valencia'],
  },

  process: {
    label: 'Paso a paso',
    h2: ['De las llaves', 'a la entrega'],
    steps: [
      { t: 'Visita', d: 'Vamos a tu vivienda en Valencia o Costa Blanca, medimos con láser, revisamos las instalaciones y escuchamos tus necesidades y tu presupuesto.' },
      { t: 'Presupuesto', d: 'En pocos días recibes una propuesta desglosada con mediciones exactas. Sabes en qué se invierte cada euro.' },
      { t: 'Contrato cerrado', d: 'Fecha de inicio, fecha garantizada de fin y pagos por hitos terminados y comprobados por ti.' },
      { t: 'Obra y vídeo semanal', d: 'Cada viernes te enviamos vídeos y explicaciones por WhatsApp. Si vives fuera de España, controlas todo desde el móvil.' },
      { t: 'Entrega', d: 'Revisamos los remates contigo, dejamos la vivienda limpia y lista para entrar a vivir, con garantía escrita de 2 años.' },
    ],
    note: 'Garantía escrita de 2 años y revisión gratuita a los 6 meses.',
  },

  founder: {
    label: 'La cara visible',
    h2: ['Hemos sufrido', 'reformas chapuceras'],
    quote: '«Por eso creamos Gridalta.»',
    paras: [
      'Hola, soy Serhiy Kuzmyk. Cuando llegué al sector de la construcción en España, me llamó la atención cuánta gente sentía pavor al oír la palabra «reforma»: presupuestos que se duplicaban, operarios que dejaban la obra a medias, nadie responsable de una humedad al mes de terminar.',
      'En Gridalta hacemos exactamente lo contrario. No somos intermediarios: yo mismo visito las obras, reviso los detalles con mis jefes de equipo y respondo personalmente a tu llamada.',
      'Si buscas un trabajo hecho con orgullo profesional, respeto por tu tiempo y transparencia total, te invito a un café en nuestra oficina de Bellreguard o a vernos en tu vivienda.',
    ],
    name: 'Serhiy Kuzmyk',
    role: 'Fundador y director de obra',
    cta: 'Hablar con Serhiy',
    photoAlt: 'Serhiy Kuzmyk, fundador de Gridalta',
  },

  reviews: {
    label: 'Opiniones',
    h2: ['Lo que dicen', 'nuestros clientes'],
    items: [
      { text: 'Compramos un piso antiguo en Valencia para reformarlo entero mientras seguíamos viviendo en Londres. Con Serhiy fue facilísimo: cada viernes teníamos vídeos comentados, el presupuesto no se movió ni un céntimo y terminaron dos días antes de lo previsto.', name: 'David y Elena M.', meta: 'Reforma integral en Ruzafa, Valencia · 115 m²' },
      { text: 'Reformaron nuestro chalet: baños, cocina abierta al salón y terraza exterior. La limpieza y el orden durante la obra fueron ejemplares. Gente educada, formal y que sabe lo que hace.', name: 'Carlos Santonja', meta: 'Chalet en Gandía · 190 m²' },
      { text: 'Cuando surgió un problema con las tuberías comunitarias, no vinieron a pedirme más dinero: lo hablaron con la comunidad, me dieron la solución técnica y se hicieron cargo de todo.', name: 'Marina V.', meta: 'Piso en Playa de San Juan, Alicante · 85 m²' },
    ],
  },

  faq: {
    label: 'Preguntas',
    h2: ['Dudas', 'habituales'],
    items: [
      { q: '¿El presupuesto puede aumentar durante la obra?', a: 'No. Trabajamos con presupuesto cerrado. Antes de empezar analizamos a fondo el inmueble. El precio del contrato no cambia, salvo que tú decidas añadir trabajos; en ese caso siempre se firma un anexo previo.' },
      { q: '¿Cómo superviso la obra si vivo fuera de Valencia o en el extranjero?', a: 'Más del 40% de nuestros clientes viven en otras ciudades o en el extranjero (Reino Unido, Ucrania, Alemania, Francia). Creamos un grupo privado de WhatsApp o Telegram con vídeos en 4K, fotos de cada avance y explicaciones del jefe de obra.' },
      { q: '¿Tramitáis las licencias de obra en el Ayuntamiento?', a: 'Sí: comunicación previa, declaraciones responsables y licencias de obra mayor o menor en Valencia, Gandía, Dénia, Jávea y alrededores, además de contenedores y retirada autorizada de escombros.' },
      { q: '¿Puedo comprar yo los azulejos y sanitarios?', a: 'Tienes total libertad. Puedes comprar tus materiales o aprovechar nuestros convenios con fabricantes (Porcelanosa, Roca, Marazzi…) a precio de distribuidor.' },
      { q: '¿Qué garantía ofrecéis por escrito?', a: 'Garantía escrita de 2 años en todas las instalaciones y trabajos, más la garantía de los fabricantes. A los 6 meses hacemos una revisión gratuita para ajustar puertas o pintura.' },
    ],
  },

  contact: {
    label: 'Contacto',
    h2: ['Hablemos', 'de tu reforma'],
    intro: 'Cuéntanos tu idea o pide una visita técnica. Te respondemos en menos de 24 horas laborables.',
    form: {
      name: 'Nombre y apellidos', phone: 'Teléfono (con prefijo)', city: 'Localidad del inmueble',
      what: '¿Qué necesitas?',
      comment: 'Cuéntanos tu proyecto', commentPh: 'Por ejemplo: piso de 90 m² en Gandía, reforma completa con cocina y dos baños',
      consent: 'Acepto la política de privacidad y que me contactéis sobre mi solicitud.',
      submit: 'Solicitar visita gratuita', sending: 'Enviando…',
      okTitle: 'Recibido', okText: 'Te contactamos en breve para coordinar la visita. Si tienes fotos o planos, mándalos por WhatsApp.',
      error: 'No se ha podido enviar. Escríbenos por WhatsApp o llámanos.',
      photoHint: '¿Tienes fotos o planos? Envíalos por WhatsApp',
    },
    other: 'Otro',
    whatsapp: 'WhatsApp directo con Serhiy', call: 'Teléfono', email: 'Email', address: 'Oficina',
    hours: 'Lun–Vie · 9:00–19:00', map: 'Cómo llegar',
    coverage: 'Trabajamos en Valencia capital, Gandía, Cullera, Oliva, Dénia, Jávea, Calpe, Altea, Benidorm y toda La Safor y Costa Blanca.',
  },

  footer: {
    tagline: 'Reformas integrales de viviendas, chalets y locales en Valencia y Costa Blanca. Compromiso, calidad y respeto a las personas.',
    legal: ['Aviso legal', 'Privacidad', 'Cookies'],
    rights: 'Todos los derechos reservados.',
  },

  drawer: { close: 'Cerrar', quote: 'Pedir presupuesto' },
  ph: 'Foto próximamente',
};
