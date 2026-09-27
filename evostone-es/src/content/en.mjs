/* English — for expats on the Costa Blanca, designers and architects. */
export default {
  meta: {
    htmlLang: 'en',
    ogLocale: 'en_GB',
    title: 'Stone Worktops & Bespoke Stonework in Alicante | Novelda Workshop · ESTONE',
    description: 'Kitchen and bathroom worktops, stone basins, large-format cladding, staircases, furniture and waterjet cutting. Our own workshop in Novelda: we measure, make and install across the Costa Blanca.',
  },

  a11y: { skip: 'Skip to content', menu: 'Menu', close: 'Close', lang: 'Language' },

  nav: {
    products: 'Products', collection: 'Collection', materials: 'Materials',
    process: 'Process', projects: 'Projects', pros: 'Trade', contact: 'Contact',
    cta: 'Get a quote',
  },

  price: (p) => {
    if (!p) return 'Price on request';
    const u = { m2: '/m²', pc: '', step: '/step', ml: '/lm' }[p.unit];
    return `from €${p.from}${u}`;
  },
  priceNote: 'Guide prices excluding VAT. The final price depends on material, size and installation.',

  materialNames: {
    quartz: 'Quartz', porcelain: 'Porcelain', natural: 'Natural stone',
    solid: 'Solid surface', metal: 'Metal', glass: 'Glass',
  },

  preloader: 'Stone workshop · Novelda',

  hero: {
    label: 'Our own workshop · Novelda, Alicante',
    h1: ['Stone,', 'made to measure'],
    h1Tail: 'from Novelda, the marble capital of Spain',
    sub: 'Worktops, basins, cladding and one-off pieces. We measure, make and install across the Costa Blanca.',
    cta: 'Get a quote',
    whatsapp: 'Message us on WhatsApp',
    trust: ['14 years of craft', 'Own workshop', 'Own installers', 'ES · EN · RU'],
    scroll: 'Scroll',
    imgAlt: 'Stone worktop made by ESTONE',
  },

  manifesto: {
    label: 'Studio',
    text: 'Every piece starts with an exact measurement and ends up installed by the same hands that cut it. No middlemen, no unnecessary joints, and a lead time we give you before we start.',
    stats: [
      { n: 14, suffix: '', label: 'years working with stone' },
      { n: 4,  suffix: '', label: 'materials, one responsibility' },
      { n: 1,  suffix: '', label: 'team from survey to fitting' },
    ],
  },

  products: {
    label: 'Products',
    h2: ['Everything in stone,', 'under one roof'],
    intro: 'From a kitchen worktop to a garden sculpture. Pick a line to see the details.',
    more: 'See more',
    quote: 'Quote for this',
    items: {
      kitchen: {
        title: 'Kitchen worktops',
        line: 'Bespoke worktops with integrated sink, island and matching splashback.',
        tags: ['Quartz', 'Porcelain', 'Marble', 'Solid surface'],
        text: 'We measure the kitchen once the units are in and make the worktop to fit with no on-site trimming. Sink, splashback and upstand in the same material and colour.',
        bullets: ['12 to 40 mm thickness, choice of edges', 'Undermount or seamless integrated sink', 'One-piece islands, bars and peninsulas', 'Matching splashbacks and window sills'],
      },
      bath: {
        title: 'Bathroom: vanities & basins',
        line: 'Seamless stone basins, from our collection or designed for your bathroom.',
        tags: ['4 own collections', 'Bespoke'],
        text: 'Vanity tops with integrated basins, hidden slot drains and cabinets clad in the same material. Four in-house collections plus pieces designed from scratch.',
        bullets: ['Seamless integrated basin', 'Hidden slot drain', 'Shower trays and bath panels', 'Cabinet and top as one volume'],
      },
      cladding: {
        title: 'Large-format cladding',
        line: 'Walls, floors and façades in slabs up to 3.2 × 1.6 m, with almost no joints.',
        tags: ['Porcelain', 'Sintered stone', 'Marble'],
        text: 'XXL slabs cut to the exact size of the wall: a shower, a fireplace or a whole façade, with the vein flowing from one slab to the next.',
        bullets: ['Shower walls and full bathrooms', 'Fireplaces and feature walls', 'Matching floors and stairs', 'Ventilated façades'],
      },
      stairs: {
        title: 'Staircases',
        line: 'Treads, stringers and floating stairs cut to the exact size.',
        tags: ['Marble', 'Granite', 'Porcelain'],
        text: 'Every step is measured and cut for its place. Straight, spiral and floating staircases with anti-slip grooves and built-in lighting.',
        bullets: ['One-piece treads and risers', 'Floating and spiral stairs', 'Anti-slip grooves', 'Integrated LED lighting'],
      },
      furniture: {
        title: 'Stone furniture',
        line: 'Tables, islands, consoles and benches. Stone as furniture, not just a surface.',
        tags: ['Marble', 'Travertine', 'Porcelain'],
        text: 'Dining, coffee and outdoor tables, consoles and benches. We design the piece with you or build to your interior designer’s drawings.',
        bullets: ['Dining and coffee tables', 'Outdoor tables and benches', 'Consoles and shelving', 'Reception desks and bars'],
      },
      sculpture: {
        title: 'Sculpture & one-offs',
        line: 'Sculptures, fireplaces and objects carved by CNC and by hand.',
        tags: ['CNC', 'Hand carving'],
        text: 'Pieces you won’t find in a catalogue: sculptures, fountains, fireplaces, signs and reliefs. We model in 3D, carve on CNC and finish by hand.',
        bullets: ['Indoor and garden sculpture', 'Fireplaces and surrounds', 'Reliefs, signs and logos', 'Fountains and water features'],
      },
      cutting: {
        title: 'Cutting service',
        line: 'We cut, profile and polish your material or ours.',
        tags: ['Bridge saw', 'CNC', 'Polishing'],
        text: 'Cutting service for homeowners, joiners and other workshops. Bring your slab or choose one with us: we cut to drawing, profile edges, make cut-outs and polish.',
        bullets: ['Straight and mitre cuts', 'Sink and hob cut-outs', 'Edge profiles and polishing', 'Work from DWG / DXF drawings'],
      },
      waterjet: {
        title: 'Waterjet cutting',
        line: 'Waterjet for impossible shapes: inlays, logos, medallions.',
        tags: ['Waterjet', 'Any material'],
        text: 'A water jet cuts stone, porcelain, glass and metal without heat or chipping. Ideal for inlays, curves and precision parts.',
        bullets: ['Marquetry and inlays', 'Logos and signage', 'Curves and fretwork', 'Stone, porcelain, glass, metal'],
      },
    },
    end: { title: 'Can’t see what you need?', text: 'If it can be made in stone, we make it. Send us a photo or a sketch.', cta: 'Tell us your idea' },
  },

  collection: {
    label: 'Basin collection',
    h2: ['Four collections,', 'four artists'],
    intro: 'Our basins are named after painters. Each series has its own character, and every model is made to fit your bathroom.',
    models: 'models',
    view: 'View models',
    series: {
      leonardo: 'Natural stone, glass and quartz combined in signature pieces.',
      monet: 'Seamless solid surface: the top flows into the basin.',
      kazimir: 'Pure geometry with a hidden slot drain.',
      salvador: 'Organic shapes designed for the room, not the catalogue.',
    },
    sinks: {
      'LE-01': 'Oval basin with hidden drain: bottom and top on one level, no step.',
      'LE-02': 'A bowl carved from a single marble boulder. You choose the stone and shape — no two are alike.',
      'LE-03': 'A top divided into zones to keep the surface tidy and safe.',
      'LE-04': 'Round glass bowl with an integrated marble base that can be lit from within.',
      'LE-05': 'Square bowl: glass sides with a marble or quartz base.',
      'LE-06': 'Marble bowl on a pedestal of the same stone, with one continuous vein.',
      'MO-01': 'The “shell”: the oval sits flush with the top, no rim, no joint. Four widths.',
      'MO-02': 'The “boat”: a hull-shaped bottom sends water to the drain from any point.',
      'MO-03': 'The shell evolved: the top turns into the basin without a single joint.',
      'MO-04': 'For tight bathrooms: the basin takes part of the slab, the rest is a shelf.',
      'MO-05': 'Guest WC with no room for a cabinet: a wall-hung cube.',
      'KA-01': 'Classic basin top with slot drain and a steep fall.',
      'KA-02': 'Slot drain and recessed bowl with work areas on both sides.',
      'KA-03': 'Freestanding basin with thin rims for a guest WC or utility room.',
      'KA-04': 'Slot drain with a work area; side-mounted tap, nothing hangs over the bowl.',
      'KA-05': 'Double basin with a recessed personal area between them.',
      'KA-06': 'Asymmetric top with two basins and shelves at different levels.',
      'KA-07': 'Basin top and cabinet as one monolith, clad in porcelain in one colour.',
      'KA-08': 'Double top resting flush on the cabinet: stone and wood on one plane.',
      'SA-01': 'Organic basin without a single right angle. Its outline never repeats.',
      'SA-02': 'The top that washes: no bowl, just a surface gently sloping to the drain.',
      'SA-03': 'A 50 mm slab, thin as a worktop. Only a field of grooves gives the basin away.',
      'SA-04': 'The room decided the shape: basin, shelf and curve fitted to the space.',
    },
  },

  materials: {
    label: 'Materials',
    h2: ['Four materials,', 'the same care'],
    intro: 'We help you choose by use, not by trend. Come to the workshop and see the slabs in person.',
    items: {
      quartz: { line: 'The kitchen standard.', props: ['Non-porous', 'Stain and scratch resistant', 'Maintenance-free'] },
      porcelain: { line: 'Heat, sun and outdoors.', props: ['Takes direct heat', 'Suitable outdoors', 'XXL slabs up to 3.2 m'] },
      natural: { line: 'Every slab is unique.', props: ['Marble, granite, travertine', 'Hand-picked in Novelda', 'Ages with character'] },
      solid: { line: 'No visible joints.', props: ['Curved shapes', 'Integrated basins', 'Repairable at home'] },
    },
    marquee: ['Quartz', 'Porcelain', 'Marble', 'Solid surface', 'Granite', 'Travertine'],
    cta: 'Not sure which? We’ll explain in 5 minutes on WhatsApp',
  },

  process: {
    label: 'Process',
    h2: ['From survey', 'to installation'],
    steps: [
      { t: 'Survey', d: 'We measure at your home with laser or templates, once the units are fitted.' },
      { t: 'Design', d: 'Technical drawing and slab selection with you. Come and see it at the workshop.' },
      { t: 'Fabrication', d: 'Cutting, CNC and polishing in our Novelda workshop. No subcontractors.' },
      { t: 'Installation', d: 'Our own team fits, seals and cleans up. One point of responsibility.' },
    ],
    note: 'You get the exact lead time before we start.',
  },

  projects: {
    label: 'Projects',
    h2: ['Recent', 'work'],
    intro: 'A glimpse of what leaves the workshop. More Costa Blanca projects coming soon.',
    view: 'View',
    items: ['Kitchen · Quartz', 'Bathroom · Solid surface', 'Staircase · Marble', 'Cladding · Porcelain', 'Table · Travertine', 'Basin · Natural stone'],
  },

  pros: {
    label: 'Trade',
    h2: ['Your workshop', 'in Novelda'],
    intro: 'For kitchen studios, interior designers, architects, developers and other workshops. We build to drawings, on fixed lead times.',
    rows: [
      { t: 'Cutting and waterjet for the trade', d: 'Your material or ours, on time.' },
      { t: 'Build to drawings', d: 'We accept DWG, DXF or dimensioned PDF.' },
      { t: 'Samples and workshop visits', d: 'Choose the slab with your client.' },
      { t: 'Trade pricing', d: 'Fixed prices and lead times per project.' },
    ],
    cta: 'Talk to the workshop',
    chip: 'Trade',
  },

  faq: {
    label: 'FAQ',
    h2: ['What people', 'ask us most'],
    items: [
      { q: 'How much does a bespoke quartz worktop cost?', a: (P) => `Kitchen worktops start ${P.kitchen ? `from €${P.kitchen.from}/m²` : 'on request'}. The final price depends on material, thickness, edges, cut-outs and installation. Send approximate sizes and we’ll price it within 24 hours.` },
      { q: 'Do you work across the whole Alicante province?', a: () => 'Yes: Alicante, Elche, Novelda, Benidorm, Torrevieja, Jávea, Dénia and the whole Costa Blanca. Murcia and Valencia on request.' },
      { q: 'How long from survey to installation?', a: () => 'It depends on the project and the material. We give you the exact lead time before we start and we stick to it.' },
      { q: 'Can I visit the workshop to choose the slab?', a: () => 'Of course. We are in Novelda; book a visit by phone or WhatsApp and we’ll show you the slabs in stock.' },
      { q: 'Do you cut material I bring myself?', a: () => 'Yes. We cut, profile, make cut-outs, polish and waterjet-cut your own material.' },
      { q: 'Do you speak English?', a: () => 'Yes. We work in English, Spanish, Russian and Ukrainian.' },
    ],
  },

  contact: {
    label: 'Contact',
    h2: ['Let’s talk', 'about your project'],
    intro: 'Tell us what you need. We’ll reply with a guide price within 24 hours.',
    form: {
      name: 'Name', phone: 'Phone or WhatsApp', what: 'What do you need?',
      measures: 'Sizes or comments', measuresPh: 'E.g. L-shaped worktop, 3.2 + 1.8 m, white quartz',
      consent: 'I accept the privacy policy and agree to be contacted about my request.',
      submit: 'Send request', sending: 'Sending…',
      okTitle: 'Received', okText: 'We’ll get back to you shortly. If you have photos or drawings, send them on WhatsApp.',
      error: 'Something went wrong. Please message us on WhatsApp or call.',
      photoHint: 'Got photos or drawings? Send them on WhatsApp',
    },
    other: 'Other',
    whatsapp: 'WhatsApp', call: 'Phone', email: 'Email', address: 'Workshop',
    hours: 'Mon–Fri · 8:00–18:00', visit: 'Workshop visits by appointment', map: 'Directions',
  },

  footer: {
    tagline: 'Bespoke stone workshop in Novelda, Alicante.',
    legal: ['Legal notice', 'Privacy', 'Cookies'],
    ua: 'ESTONE Ukraine',
    rights: 'All rights reserved.',
  },

  drawer: { close: 'Close', quote: 'Get a quote', gallery: 'Photos' },
  ph: 'Photo coming soon',
};
