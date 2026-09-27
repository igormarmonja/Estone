/* English. Proofread by a native speaker before sending. */
export default {
  htmlLang: 'en',
  subject: 'Seamless basins, fresh out of the workshop',
  preheader: 'Four collections of stone basins, made to measure in Novelda.',

  top: { issue: 'No.', webview: 'View in browser' },

  hero: {
    label: 'Own workshop in Novelda · Alicante',
    h1: ['Stone', 'made to measure'],
    tail: 'from Novelda, the marble capital',
    sub: 'This month: seamless basins and worktops that turn into a sink. We measure, make and install across the Costa Blanca.',
    cta: 'Get a quote',
    whatsapp: 'WhatsApp',
    trust: ['14 years of craft', 'Own workshop', 'Own installers'],
    imgAlt: 'Stone worktop made by ESTONE',
  },

  manifesto: {
    label: 'Studio',
    hello: (name) => `Hi ${name},`,
    text: 'Every piece starts with an exact measurement and ends up installed by the same hands that cut it. No middlemen, no unnecessary joints, and a lead time we give you before we start.',
    stats: [
      { n: '14', label: 'years working stone' },
      { n: '4',  label: 'materials, one point of responsibility' },
      { n: '1',  label: 'team from survey to fitting' },
    ],
  },

  collection: {
    label: 'Basin collection',
    h2: ['Four collections,', 'four artists'],
    intro: 'Our basins are named after painters. Every model is made to fit your bathroom.',
    models: 'models',
    view: 'See models',
    series: {
      leonardo: 'Natural stone, glass and quartz combined in signature pieces.',
      monet: 'Seamless solid surface: the worktop flows into the basin.',
      kazimir: 'Pure geometry with a hidden slot drain.',
      salvador: 'Organic shapes designed for the room, not the catalogue.',
    },
  },

  products: {
    label: 'Products',
    h2: ['Everything in stone,', 'under one roof'],
    items: {
      kitchen: 'Kitchen worktops',
      bath: 'Bathroom: vanities and basins',
      cladding: 'Large-format cladding',
      stairs: 'Staircases',
    },
    price: (p) => {
      if (!p) return 'On quotation';
      const u = { m2: '/m²', pc: '', step: '/step', ml: '/lm' }[p.unit];
      return `from €${p.from}${u}`;
    },
    note: 'Indicative prices excluding VAT. The final price depends on material, size and installation.',
    all: 'See all products',
  },

  materials: {
    label: 'Materials',
    h2: ['Four materials,', 'the same care'],
    marquee: ['Quartz', 'Porcelain', 'Marble', 'Solid surface'],
    items: [
      { t: 'Quartz', d: 'The kitchen standard. Non-porous, no maintenance.' },
      { t: 'Porcelain', d: 'Heat, sun and outdoors. XXL slabs up to 3.2 m.' },
      { t: 'Natural stone', d: 'Every slab is unique. Selected in Novelda.' },
      { t: 'Solid surface', d: 'No visible joints. Curves and integrated basins.' },
    ],
    cta: 'Not sure which? We’ll explain on WhatsApp',
  },

  process: {
    label: 'Process',
    h2: ['From survey', 'to installation'],
    steps: [
      { t: 'Survey', d: 'We measure on site with laser or template, over the fitted units.' },
      { t: 'Design', d: 'Technical drawing and slab selection together with you.' },
      { t: 'Fabrication', d: 'Cutting, CNC and polishing in our Novelda workshop. No subcontractors.' },
      { t: 'Installation', d: 'Our own team fits, seals and leaves everything clean.' },
    ],
  },

  visit: {
    label: 'Workshop visits',
    h2: ['Come and see', 'the slabs'],
    text: 'Choose your slab in person, in daylight, with the edge in your hand. Book a visit and we’ll show you around.',
    cta: 'Book a visit on WhatsApp',
  },

  contact: {
    label: 'Contact',
    h2: ['Let’s talk', 'about your project'],
    intro: 'Reply to this email or message us. You’ll get an indicative price within 24 hours.',
    whatsapp: 'WhatsApp', call: 'Phone', email: 'Email', address: 'Workshop',
    hours: 'Mon–Fri · 8:00–18:00',
    cta: 'Get a quote',
  },

  footer: {
    tagline: 'Made-to-measure stone workshop in Novelda, Alicante.',
    why: 'You are receiving this email because you subscribed at evostone.es or asked us for a quote.',
    unsubscribe: 'Unsubscribe',
    web: 'Website',
  },
};
