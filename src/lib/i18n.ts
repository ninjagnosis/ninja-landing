// English and Nepali. English is the default (no prefix); Nepali lives under
// /ne. Pages that have a Nepali version are listed in `hasNepali`; the blog
// and the legal pages are English only.
export type Lang = 'en' | 'ne';

export const langOf = (locale?: string): Lang => (locale === 'ne' ? 'ne' : 'en');

/** Internal link in the page's own language. */
export const href = (lang: Lang, path: string) => (lang === 'ne' ? (path === '/' ? '/ne' : `/ne${path}`) : path);

/** The path without the /ne prefix. */
export const enPath = (path: string) => (path === '/ne' ? '/' : path.startsWith('/ne/') ? path.slice(3) : path);

const NE_PAGES = ['/', '/products', '/about', '/locations', '/careers', '/contact'];
export const hasNepali = (path: string) => NE_PAGES.includes(path) || /^\/products\/[a-z]+$/.test(path);

export const ui = {
  en: {
    products: 'Products', about: 'About', blog: 'Blog', careers: 'Careers', contact: 'Contact', locations: 'Locations', privacy: 'Privacy',
    contactUs: 'Contact us', callUs: 'Call us', menu: 'Menu', skip: 'Skip to content',
    megaFeature: 'How the group decides what to build and what to stop', readBlog: 'Read the blog', allPosts: 'All posts', fromBlog: 'From the blog',
    footer: { products: 'Products', company: 'Company', legal: 'Legal', terms: 'Terms', privacy: 'Privacy', cookies: 'Cookies' },
    nepalLine: 'Ninja Infosys LLC operates in Nepal through Ninja Infosys Pvt. Ltd., a Nepal-registered private limited company.',
    ctaHeading: 'Talk to Ninja Infosys LLC',
    heroSub: 'The holding company for eShasan, ePahichan, AirFone, LunaIoT and LunaCam.', heroAbout: 'About the group',
    groupH: 'One group, five products',
    groupP: 'Ninja Infosys LLC holds and runs a group of software products. Each product has its own site, its own users and its own roadmap. The group decides where to invest, what to build next and what to stop.',
    groupLink: 'About the group', productsH: 'Products', groupProducts: "The group's products", holds: 'What the group holds',
    homeDesc: 'Ninja Infosys LLC is the holding company for eShasan, ePahichan, AirFone, LunaIoT and LunaCam, software products built and run in Nepal.',
    productsDesc: 'The five products held by Ninja Infosys LLC: eShasan, ePahichan, AirFone, LunaIoT and LunaCam.',
    visit: 'Visit', does: 'What it does', others: 'Other products',
    aboutH: 'About Ninja Infosys LLC', aboutDesc: 'Ninja Infosys LLC is a holding company. It owns and runs eShasan, ePahichan, AirFone, LunaIoT and LunaCam and operates in Nepal through Ninja Infosys Pvt. Ltd.',
    aboutP1: 'Ninja Infosys LLC is a holding company. It owns and runs a group of software products and decides where the group invests, what it builds next and what it stops.',
    aboutP2: 'The products are eShasan, ePahichan, AirFone, LunaIoT and LunaCam. Each one has its own site and its own users. The group sits above them and keeps the work that should be shared, such as finance, hiring and strategy, in one place.',
    where: 'Where we operate', regNo: 'Company registration number', pan: 'PAN', officesLink: 'Offices and contact details',
    locDesc: 'Ninja Infosys LLC offices in Denver, Colorado and Kathmandu, Nepal, with phone and email for the group.', cityDenver: 'Denver', cityKtm: 'Kathmandu',
    careersDesc: "There are no open roles at Ninja Infosys LLC right now. New roles across the group's products are posted on this page.",
    careersP1: "There are no open roles right now. New roles across the group's products are posted on this page.", careersP2: 'To introduce yourself, write to',
    contactDesc: 'Contact Ninja Infosys LLC by phone, email or the form about the group or any of its products.',
    contactH: 'Contact Ninja Infosys LLC', phone: 'Phone', email: 'Email', address: 'Address', send: 'Send a message',
    form: { first: 'First name', last: 'Last name', email: 'Email', message: 'Message', consent: 'I agree that Ninja Infosys LLC may contact me about my message.', submit: 'Send message',
      invalid: 'Enter your name and a valid email address.', sending: 'Sending...', ok: 'Thank you. We have your message and will reply by email.', fail: 'The message did not send. Try again, or email us directly.' },
  },
  ne: {
    products: 'उत्पादनहरू', about: 'हाम्रो बारेमा', blog: 'ब्लग (अंग्रेजी)', careers: 'क्यारियर', contact: 'सम्पर्क', locations: 'स्थानहरू', privacy: 'गोपनीयता',
    contactUs: 'सम्पर्क गर्नुहोस्', callUs: 'फोन गर्नुहोस्', menu: 'मेनु', skip: 'मुख्य सामग्रीमा जानुहोस्',
    megaFeature: 'समूहले के बनाउने र के रोक्ने भनेर कसरी निर्णय गर्छ', readBlog: 'ब्लग पढ्नुहोस्', allPosts: 'सबै पोस्ट', fromBlog: 'ब्लगबाट',
    footer: { products: 'उत्पादनहरू', company: 'कम्पनी', legal: 'कानुनी', terms: 'सेवाका सर्त', privacy: 'गोपनीयता', cookies: 'कुकी' },
    nepalLine: 'Ninja Infosys LLC नेपालमा, नेपालमा दर्ता भएको निजी लिमिटेड कम्पनी Ninja Infosys Pvt. Ltd. मार्फत सञ्चालन हुन्छ।',
    ctaHeading: 'Ninja Infosys LLC सँग कुरा गर्नुहोस्',
    heroSub: 'eShasan, ePahichan, AirFone, LunaIoT र LunaCam को होल्डिङ कम्पनी।', heroAbout: 'समूहको बारेमा',
    groupH: 'एउटा समूह, पाँच उत्पादन',
    groupP: 'Ninja Infosys LLC सफ्टवेयर उत्पादनहरूको समूह राख्ने र चलाउने होल्डिङ कम्पनी हो। प्रत्येक उत्पादनको आफ्नै साइट, आफ्नै प्रयोगकर्ता र आफ्नै योजना हुन्छ। समूहले कहाँ लगानी गर्ने, अर्को के बनाउने र के रोक्ने भन्ने निर्णय गर्छ।',
    groupLink: 'समूहको बारेमा', productsH: 'उत्पादनहरू', groupProducts: 'समूहका उत्पादनहरू', holds: 'समूहले राखेका उत्पादनहरू',
    homeDesc: 'Ninja Infosys LLC eShasan, ePahichan, AirFone, LunaIoT र LunaCam को होल्डिङ कम्पनी हो, जुन नेपालमै बनाइएका र चलाइएका सफ्टवेयर उत्पादनहरू हुन्।',
    productsDesc: 'Ninja Infosys LLC ले राखेका पाँच उत्पादन: eShasan, ePahichan, AirFone, LunaIoT र LunaCam।',
    visit: 'जानुहोस्:', does: 'के गर्छ', others: 'अन्य उत्पादनहरू',
    aboutH: 'Ninja Infosys LLC को बारेमा', aboutDesc: 'Ninja Infosys LLC एक होल्डिङ कम्पनी हो। यसले eShasan, ePahichan, AirFone, LunaIoT र LunaCam राख्छ र चलाउँछ, र नेपालमा Ninja Infosys Pvt. Ltd. मार्फत सञ्चालन हुन्छ।',
    aboutP1: 'Ninja Infosys LLC एक होल्डिङ कम्पनी हो। यसले सफ्टवेयर उत्पादनहरूको समूह राख्छ र चलाउँछ, र समूहले कहाँ लगानी गर्ने, अर्को के बनाउने र के रोक्ने भन्ने निर्णय गर्छ।',
    aboutP2: 'उत्पादनहरू eShasan, ePahichan, AirFone, LunaIoT र LunaCam हुन्। प्रत्येकको आफ्नै साइट र आफ्नै प्रयोगकर्ता छन्। समूह तिनीहरूभन्दा माथि बसेर वित्त, भर्ना र रणनीति जस्ता साझा काम एकै ठाउँमा राख्छ।',
    where: 'हामी कहाँ काम गर्छौं', regNo: 'कम्पनी दर्ता नम्बर', pan: 'प्यान', officesLink: 'कार्यालय र सम्पर्क विवरण',
    locDesc: 'डेनभर, कोलोराडो र काठमाडौं, नेपालमा रहेका Ninja Infosys LLC का कार्यालय, समूहको फोन र इमेलसहित।', cityDenver: 'डेनभर', cityKtm: 'काठमाडौं',
    careersDesc: 'हाल Ninja Infosys LLC मा कुनै खुला पद छैन। समूहका उत्पादनहरूमा नयाँ पद यसै पृष्ठमा प्रकाशित गरिनेछ।',
    careersP1: 'हाल कुनै खुला पद छैन। समूहका उत्पादनहरूमा नयाँ पद यसै पृष्ठमा प्रकाशित गरिनेछ।', careersP2: 'आफ्नो परिचय दिन यहाँ लेख्नुहोस्:',
    contactDesc: 'समूह वा यसका कुनै उत्पादनका बारेमा फोन, इमेल वा फारमबाट Ninja Infosys LLC सँग सम्पर्क गर्नुहोस्।',
    contactH: 'Ninja Infosys LLC सँग सम्पर्क', phone: 'फोन', email: 'इमेल', address: 'ठेगाना', send: 'सन्देश पठाउनुहोस्',
    form: { first: 'पहिलो नाम', last: 'थर', email: 'इमेल', message: 'सन्देश', consent: 'म सहमत छु कि Ninja Infosys LLC ले मेरो सन्देशका सम्बन्धमा मसँग सम्पर्क गर्न सक्छ।', submit: 'सन्देश पठाउनुहोस्',
      invalid: 'आफ्नो नाम र मान्य इमेल ठेगाना लेख्नुहोस्।', sending: 'पठाउँदै...', ok: 'धन्यवाद। हामीले तपाईंको सन्देश पाएका छौं र इमेलमा जवाफ दिनेछौं।', fail: 'सन्देश पठाउन सकिएन। फेरि प्रयास गर्नुहोस्, वा हामीलाई सिधै इमेल गर्नुहोस्।' },
  },
} as const;
