const SITE_URL = process.env.FRONTEND_URL?.replace(/\/$/, '') ?? 'https://blakehammondrealestate.com';

export function localBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'Blake Hammond Real Estate',
    url: SITE_URL,
    telephone: '+19166256118',
    email: 'blakehammondre@gmail.com',
    image: `${SITE_URL}/images/logo_1779376344245.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '925 Highland Pointe Dr Suite #140',
      addressLocality: 'Roseville',
      addressRegion: 'CA',
      postalCode: '95678',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 38.7521,
      longitude: -121.2880,
    },
    areaServed: [
      { '@type': 'City', name: 'Roseville', containedInPlace: { '@type': 'State', name: 'California' } },
      { '@type': 'City', name: 'Sacramento', containedInPlace: { '@type': 'State', name: 'California' } },
      { '@type': 'City', name: 'Folsom', containedInPlace: { '@type': 'State', name: 'California' } },
      { '@type': 'City', name: 'Rocklin', containedInPlace: { '@type': 'State', name: 'California' } },
      { '@type': 'City', name: 'Lincoln', containedInPlace: { '@type': 'State', name: 'California' } },
      { '@type': 'City', name: 'Elk Grove', containedInPlace: { '@type': 'State', name: 'California' } },
    ],
    sameAs: [],
  };
}

export function faqPageJsonLd(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export const staticFaqItems: { question: string; answer: string }[] = [
  { question: 'How much do I need saved to buy a home?', answer: 'Plan for a 3% to 10% down payment, plus 2% to 3% for closing costs. A trusted lender will map out your exact numbers.' },
  { question: 'Should I get pre-approved before we start touring?', answer: 'Yes. It locks in your actual budget and proves to sellers that you are a serious, qualified buyer the moment you submit an offer.' },
  { question: 'How long does it take to find and close on a home?', answer: 'Once an offer is accepted, closing typically takes 30 to 60 days. The upfront search timeline depends entirely on your criteria and inventory.' },
  { question: 'Do you help with off-market or coming-soon listings?', answer: 'Yes. An active professional network uncovers properties before they hit public search apps, giving you an early advantage.' },
  { question: 'What does it cost to work with you as a buyer?', answer: 'All representation and industry commission structures are explained transparently during our very first conversation with zero surprises.' },
  { question: 'How do you decide on a list price?', answer: 'Recent neighborhood sales are analyzed, your home\'s unique features are evaluated, and current buyer demand is measured to set a strategic asking price.' },
  { question: 'What does your prep program include?', answer: 'It covers the initial property consultation, direct contractor coordination, professional staging, and high-end photography and video production.' },
  { question: 'How long does it take to sell?', answer: 'Accurately priced, well-prepared homes typically secure competitive interest within the first few weeks. Timelines are intentionally aligned around your moving goals.' },
  { question: 'What does it cost to list with you?', answer: 'All marketing, representation, and commission structures are reviewed transparently during our first call with zero surprises or restrictive terms.' },
  { question: 'Will you handle showings and feedback?', answer: 'Yes. Every showing is fully coordinated, hosted, and tracked, with direct buyer feedback shared during your regular weekly update.' },
  { question: 'How much does the Home Prep Selling Program cost upfront?', answer: 'Absolutely nothing. All vendor and material costs are settled at closing out of your sale proceeds, so you never pay out of pocket.' },
  { question: 'What if my home doesn\'t end up selling?', answer: 'Complete transparency is maintained regarding the rare scenarios where costs would be owed, and the straightforward agreement is reviewed together before any work begins.' },
  { question: 'How long does the renovation process usually take?', answer: 'Most homes are market-ready within 2 to 4 weeks depending on the scope of the updates. A clear timeline is provided during the initial walkthrough.' },
  { question: 'Do I have to use your renovation contractors?', answer: 'A vetted network is what keeps the program running quickly and smoothly, but any specific parts you prefer to handle yourself can easily be accommodated.' },
  { question: 'Will I be involved in design and approval decisions?', answer: 'Always. You maintain final approval over the project scope, finishes, and budget before work starts, backed by clear weekly progress updates.' },
];
