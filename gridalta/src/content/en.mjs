/* English. Have a native speaker proofread before launch. */
export default {
  meta: {
    htmlLang: 'en',
    ogLocale: 'en_GB',
    title: 'Gridalta — Full home renovations in Valencia & Costa Blanca | Fixed price',
    description: 'Turnkey renovations in Valencia and the Costa Blanca. Fixed price by contract, no delays and weekly video reports. 120+ projects and 7+ years of experience.',
  },

  a11y: { skip: 'Skip to content', menu: 'Menu', close: 'Close', lang: 'Language' },

  nav: {
    services: 'Services', beforeAfter: 'Before & after', calculator: 'Calculator',
    projects: 'Projects', why: 'Why Gridalta', contact: 'Contact',
    cta: 'Get a quote',
  },

  preloader: 'Full renovations · Valencia',

  hero: {
    label: 'Full renovations in Valencia & Costa Blanca',
    h1: ['Renovation', 'without stress'],
    h1Tail: 'no delays and a fixed price',
    sub: 'Complete turnkey works: from permits and demolition to installations, high-end finishes and bespoke joinery. With weekly video reports.',
    cta: 'Estimate your cost in 2 min',
    whatsapp: 'WhatsApp us',
    trust: ['Fixed price by contract', 'Guaranteed deadlines', 'Video every Friday', 'Own team of 55 specialists'],
    scroll: 'Scroll',
    imgAlt: 'Bathroom with marble-effect porcelain renovated by Gridalta',
  },

  manifesto: {
    label: 'How we work',
    text: '“90% of renovation problems don’t come from materials or design, but from people who don’t keep their word. At Gridalta we work the human way.”',
    author: 'Serhiy Kuzmyk · Founder of Gridalta',
    stats: [
      { n: 120, suffix: '+', label: 'completed projects: houses, penthouses, villas and shops' },
      { n: 7,   suffix: '+', label: 'years specialising in turnkey renovations' },
      { n: 55,  suffix: '',  label: 'in-house builders, plumbers, electricians and carpenters' },
      { n: 0,   suffix: '€', label: 'hidden extras: the contract is fixed before we start' },
    ],
  },

  services: {
    label: 'Services',
    h2: ['Your whole space,', 'one team'],
    intro: 'No more chasing plumbers, builders and electricians who never coordinate. We handle 100% of the project.',
    more: 'Read more',
    quote: 'Quote for this',
    items: {
      vivienda: {
        title: 'Full home renovation',
        line: 'Old or newly bought flats turned into bright, efficient homes.',
        tags: ['Turnkey', 'Flats', 'Penthouses'],
        text: 'We turn old flats and newly purchased homes into bright, thermally efficient spaces that stay comfortable for decades.',
        bullets: ['Certified demolition and waste removal', 'Ergonomic redistribution of walls', 'New plumbing and electrical installation', 'Continuous thermal and acoustic insulation'],
      },
      cocina: {
        title: 'Bespoke designer kitchens',
        line: 'Practical layouts, tough worktops and smart storage.',
        tags: ['Made to measure', 'Porcelain', 'Quartz'],
        text: 'The kitchen is the heart of the home. We design practical layouts where everything is at hand, with durable worktops and smart storage.',
        bullets: ['Made-to-measure units', 'Porcelain and quartz worktops', 'Indirect LED lighting under cabinets', 'Appliance fitting and integration'],
      },
      bano: {
        title: 'Wellness bathrooms',
        line: 'From dark, dated bathrooms to spacious places to relax.',
        tags: ['Walk-in shower', 'Large format'],
        text: 'We turn dark or dated bathrooms into spacious places to relax: non-slip walk-in showers, made-to-measure screens and wall-hung sanitaryware.',
        bullets: ['Certified multi-layer waterproofing', 'Flush resin shower trays', 'Wall-hung units with organised drawers', 'Concealed thermostatic taps'],
      },
      villa: {
        title: 'Villas on the Costa Blanca',
        line: 'Structural works, insulation against the Mediterranean heat, terraces.',
        tags: ['Heat pump', 'Façades', 'Outdoor'],
        text: 'Structural renovations, insulation for the Mediterranean heat, new windows for panoramic views and terraces with pools.',
        bullets: ['Minimal thermal-break aluminium', 'Aerothermal heat pump and underfloor heating/cooling', 'Bioclimatic pergolas and outdoor paving', 'Façade renovation with thermal mortars'],
      },
      local: {
        title: 'Shops and offices',
        line: 'Strict schedules so you open on the agreed date.',
        tags: ['Regulations', 'High power', 'Acoustics'],
        text: 'Every day of delay costs a business money. We work to strict schedules so you open on the date we set.',
        bullets: ['High-power electrical installations', 'Soundproofing to regulations', 'Heavy-traffic, hard-wearing finishes', 'Accessibility and opening licence requirements'],
      },
      alquiler: {
        title: 'Renovate to rent or sell',
        line: 'A refresh that raises the property’s value on a controlled budget.',
        tags: ['Fast return', 'Express'],
        text: 'Smart refurbishments that raise the market value of the property with a controlled investment and a quick return.',
        bullets: ['Express kitchen and bathroom update', 'Neutral paint and new LED lighting', 'Continuous vinyl or laminate floors', 'Higher sale price or rent'],
      },
    },
    end: { title: 'Is your project different?', text: 'Tell us what you need: if it’s a renovation, we’ll run it from start to finish.', cta: 'Let’s talk' },
  },

  beforeAfter: {
    label: 'Before & after',
    h2: ['Real projects,', 'not renders'],
    intro: 'Drag to compare the space during works with the finished result.',
    before: 'Before',
    after: 'Gridalta',
    handle: 'Drag to compare',
    title: 'Bespoke kitchen with island · Valencia',
    text: 'Floor-to-ceiling bespoke units, a central island with a porcelain worktop, oven columns and integrated LED lighting.',
    facts: ['Fixed budget met 100%', 'Our own installation team'],
  },

  calculator: {
    label: 'Calculator',
    h2: ['What will your', 'renovation cost?'],
    intro: 'Choose the property type, size and finish level to get a realistic market estimate for Valencia and the Costa Blanca.',
    steps: ['Property type', 'Floor area', 'Finish level', 'Extra services'],
    types: {
      apartment: 'Flat / apartment',
      house: 'House / villa',
      commercial: 'Shop / business',
      bathKitchen: 'Kitchen and/or bathrooms',
    },
    areaLabel: 'Built area in square metres',
    qualities: {
      standard: { t: 'Comfort & balance', d: 'Leading brands (Roca, Porcelanosa, Climalit), washable paint and AC5 flooring.' },
      premium:  { t: 'High-end & design', d: 'Microcement, large-format porcelain, flush doors and concealed taps.' },
      luxury:   { t: 'Exclusive / signature', d: 'Natural hardwood, KNX home automation, hidden joinery and sintered stone.' },
    },
    addons: {
      kitchen: 'Bespoke kitchen with appliances',
      furniture: 'Built-in wardrobes and joinery',
      licenses: 'Building permit management',
      hvac: 'Ducted air conditioning / heat pump',
    },
    result: 'Approximate investment',
    time: 'Estimated time',
    weeks: 'weeks',
    note: 'Indicative estimate based on current labour and material prices in Valencia and Alicante. VAT not included.',
    whatsapp: 'Ask on WhatsApp',
    visit: 'Book a free site visit',
    waMsg: 'Hi, I used the calculator on gridalta.es:',
  },

  why: {
    label: 'Why Gridalta',
    h2: ['Clients who', 'can relax'],
    intro: 'The difference between hiring loose crews and trusting your home to a builder with principles.',
    marquee: ['Fixed price', 'Deadlines by contract', 'Video every Friday', 'Own team', '2-year warranty'],
    market: 'A typical renovation',
    us: 'With Gridalta',
    rows: [
      { k: 'Budget', bad: 'A vague one-page quote. Halfway through: “that wasn’t included, it’s €8,000 more”.', good: 'Itemised quote, line by line. Fixed price by contract: not a single extra euro without your signature.' },
      { k: 'Deadlines', bad: '“We’ll be done in a month”. Four months later nobody shows up on Mondays.', good: 'Handover date in the contract. If we’re late through our own fault, we compensate you for every day.' },
      { k: 'Communication', bad: 'You chase the foreman on the phone: “I’ll look at it tomorrow”.', good: 'Direct chat with Serhiy and the site manager. Photos and videos of progress every Friday.' },
      { k: 'Team', bad: 'Unknown subcontractors rotating depending on who is free.', good: 'Our own team that has worked together for years, with the same standards of order and cleanliness.' },
      { k: 'Materials', bad: 'Hidden mark-ups or weekends lost in tile shops.', good: 'Distributor prices on leading brands, technical advice and delivery to site.' },
    ],
  },

  projects: {
    label: 'Projects',
    h2: ['Finished', 'work'],
    intro: 'Every project reflects its owner’s lifestyle. No catalogue solutions: tailor-made work done with precision.',
    view: 'View',
    items: ['Kitchen with island · Gandía', 'Wellness bathroom · Dénia', 'Family home · Valencia', 'Large-format bathroom · Valencia', 'Worktop & LED profile · Oliva', 'Kitchen columns · Valencia'],
  },

  process: {
    label: 'Step by step',
    h2: ['From the keys', 'to handover'],
    steps: [
      { t: 'Site visit', d: 'We come to your home in Valencia or the Costa Blanca, laser-measure, check the installations and listen to your needs and budget.' },
      { t: 'Itemised quote', d: 'Within days you get a detailed proposal with exact measurements. You know where every euro goes.' },
      { t: 'Fixed contract', d: 'Start date, guaranteed completion date and payments by milestones finished and checked by you.' },
      { t: 'Works & weekly video', d: 'Every Friday we send videos and explanations on WhatsApp. Living abroad? You stay in control from your phone.' },
      { t: 'Handover', d: 'We check the finishes with you and leave the home clean and ready to move in, with a written 2-year warranty.' },
    ],
    note: 'Written 2-year warranty and a free check-up after 6 months.',
  },

  founder: {
    label: 'The face behind it',
    h2: ['We’ve been through', 'botched renovations'],
    quote: '“That’s why we created Gridalta.”',
    paras: [
      'Hi, I’m Serhiy Kuzmyk. When I started in construction in Spain, I was struck by how many people dreaded the word “renovation”: budgets that doubled, workers who left jobs half-done, nobody responsible for damp a month after handover.',
      'At Gridalta we do exactly the opposite. We’re not middlemen: I visit the sites myself, check the details with my team leaders and answer your call personally.',
      'If you want work done with professional pride, respect for your time and total transparency, come for a coffee at our office in Bellreguard or let’s meet at your home.',
    ],
    name: 'Serhiy Kuzmyk',
    role: 'Founder and site director',
    cta: 'Talk to Serhiy',
    photoAlt: 'Serhiy Kuzmyk, founder of Gridalta',
  },

  reviews: {
    label: 'Reviews',
    h2: ['What our', 'clients say'],
    items: [
      { text: 'We bought an old flat in Valencia to renovate completely while still living in London. With Serhiy it was easy: every Friday we got narrated videos, the budget didn’t move a cent and they finished two days early.', name: 'David & Elena M.', meta: 'Full renovation in Ruzafa, Valencia · 115 m²' },
      { text: 'They renovated our house: bathrooms, a kitchen open to the living room and the outdoor terrace. The order and cleanliness during the works were exemplary. Polite, reliable people who know what they’re doing.', name: 'Carlos Santonja', meta: 'House in Gandía · 190 m²' },
      { text: 'When a problem came up with the building’s shared pipes, they didn’t ask me for more money: they spoke to the community, gave me the technical solution and took care of everything.', name: 'Marina V.', meta: 'Flat in Playa de San Juan, Alicante · 85 m²' },
    ],
  },

  faq: {
    label: 'Questions',
    h2: ['Common', 'questions'],
    items: [
      { q: 'Can the budget increase during the works?', a: 'No. We work to a fixed price. Before starting we analyse the property thoroughly. The contract price doesn’t change unless you decide to add work, and then an annex is always signed first.' },
      { q: 'How can I oversee the works if I live abroad?', a: 'Over 40% of our clients live in other cities or abroad (UK, Ukraine, Germany, France). We set up a private WhatsApp or Telegram group with 4K videos, photos of every step and explanations from the site manager.' },
      { q: 'Do you handle building permits with the town hall?', a: 'Yes: prior notices, responsible declarations and major or minor works permits in Valencia, Gandía, Dénia, Jávea and nearby, plus skips and authorised waste removal.' },
      { q: 'Can I buy the tiles and sanitaryware myself?', a: 'You’re completely free to. Buy your own materials or use our agreements with manufacturers (Porcelanosa, Roca, Marazzi…) at distributor prices.' },
      { q: 'What written warranty do you give?', a: 'A written 2-year warranty on all installations and work, plus the manufacturers’ warranties. After 6 months we do a free check-up to adjust doors or paint.' },
    ],
  },

  contact: {
    label: 'Contact',
    h2: ['Let’s talk', 'renovation'],
    intro: 'Tell us your idea or book a site visit. We reply within 24 working hours.',
    form: {
      name: 'Full name', phone: 'Phone (with country code)', city: 'Property location',
      what: 'What do you need?',
      comment: 'Tell us about your project', commentPh: 'For example: 90 m² flat in Gandía, full renovation with kitchen and two bathrooms',
      consent: 'I accept the privacy policy and agree to be contacted about my request.',
      submit: 'Book a free visit', sending: 'Sending…',
      okTitle: 'Received', okText: 'We’ll be in touch shortly to arrange the visit. If you have photos or plans, send them on WhatsApp.',
      error: 'Something went wrong. Message us on WhatsApp or call us.',
      photoHint: 'Photos or plans? Send them on WhatsApp',
    },
    other: 'Other',
    whatsapp: 'WhatsApp Serhiy directly', call: 'Phone', email: 'Email', address: 'Office',
    hours: 'Mon–Fri · 9:00–19:00', map: 'Get directions',
    coverage: 'We work in Valencia city, Gandía, Cullera, Oliva, Dénia, Jávea, Calpe, Altea, Benidorm and across La Safor and the Costa Blanca.',
  },

  footer: {
    tagline: 'Full renovations of homes, villas and shops in Valencia and the Costa Blanca. Commitment, quality and respect for people.',
    legal: ['Legal notice', 'Privacy', 'Cookies'],
    rights: 'All rights reserved.',
  },

  drawer: { close: 'Close', quote: 'Get a quote' },
  ph: 'Photo coming soon',
};
