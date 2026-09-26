export const brandConfig = {
  name: 'BRWW',
  monogram: 'BRWW',
  tagline: 'Artisanal Roastery & Tasting Room · Est. 2010',
  headline: 'The Art of Vintage Roast & Velvet Notes',
  subtext:
    "Coffee is our sacred craft. From shade-grown high-altitude micro-lots to vintage cast-iron drum roasting, every pour at BRWW is a sensory journey into rich warmth and velvet crema.",
  
  colors: {
    primaryAccent: '#2D5A47', // Classic Deep Sage / Forest Green
    primaryHover: '#3d7a5f',
    primaryDark: '#1e3d30',
    primarySubtle: 'rgba(45, 90, 71, 0.10)',
    bgPrimary: '#FFFFFF',       // Pure white
    bgAlternate: '#FAF9F6',     // Warm soft paper white
    bgCard: '#F0F4F1',          // Subtle light sage tint
    bodyText: '#1F2923',        // Deep slate-green
    secondaryText: '#5A6B63',   // Muted green-grey
    creamWarm: '#f0e8dc',
    coffeeAccent: '#C88A58',    // Warm roasted coffee brown
    coffeeMuted: 'rgba(200, 138, 88, 0.35)',
    tealSecondary: '#58A79B',   // Retained teal secondary accent
    borderMuted: 'rgba(45, 90, 71, 0.15)',
    borderWarm: 'rgba(45, 90, 71, 0.10)',
  },

  currencies: {
    USD: {
      code: 'USD',
      symbol: '$',
      rate: 1,
      format: (amount) => `$${amount.toFixed(2)}`,
    },
    INR: {
      code: 'INR',
      symbol: '₹',
      rate: 85,
      format: (amount) => `₹${Math.round(amount * 85)}`,
    },
  },

  contact: {
    address: '42 Heritage Roasters Alley, Historic District',
    city: 'New York / Bengaluru',
    phone: '+1 (800) 555-BRWW',
    email: 'concierge@brww.coffee',
    hours: {
      weekdays: 'Monday – Friday: 7:00 AM – 10:00 PM',
      weekends: 'Saturday – Sunday: 8:00 AM – 11:30 PM',
      tastingSessions: 'Daily Cupping Sessions: 11:00 AM & 4:00 PM',
    },
    socials: [
      { name: 'Instagram', url: '#instagram' },
      { name: 'Telegram', url: '#telegram' },
      { name: 'Twitter/X', url: '#twitter' },
      { name: 'YouTube', url: '#youtube' },
    ],
  },

  roasteryMilestones: [
    {
      year: '2010',
      title: 'The Vintage Drum Awakening',
      description: 'Founded with a restored 1962 Probat cast-iron drum roaster, dedicated to slow-roasted single-origin profiles.',
    },
    {
      year: '2014',
      title: 'Direct Trade Micro-lots',
      description: 'Forged direct relationships with ancestral coffee estates across Yirgacheffe, Huila, and the Western Ghats.',
    },
    {
      year: '2019',
      title: 'The Velvet Crema Extraction',
      description: 'Pioneered our signature nitrogen-infused velvet extraction technique, delivering creamy micro-foam without dairy.',
    },
    {
      year: '2025',
      title: 'Global Artisanal Recognition',
      description: 'Awarded the Golden Cup for Sustainable Roastery Excellence and craft cupping immersion.',
    },
  ],
}
