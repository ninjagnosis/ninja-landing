// The five products the group holds. One source for the product pages, the
// menus, the home page, structured data and llms.txt.
export interface Product {
  slug: string;
  name: string;
  short: string;
  headline: string;
  description: string;
  highlights: string[];
  url: string;
  host: string;
  image?: string;
  imageAlt?: string;
  /** Blog tags whose posts are listed on the product page. */
  tags: string[];
  /** Nepali text for the product page. */
  ne: { short: string; headline: string; description: string; highlights: string[] };
}

export const products: Product[] = [
  {
    slug: 'eshasan',
    name: 'eShasan',
    short: 'An ERP platform for governments, NGOs and enterprises.',
    headline: 'eShasan: one platform for institutional management',
    description:
      'eShasan brings the functions of an institution into one system. Deploy only the modules you need, scale as you grow, and keep a full audit trail of every action, with role-based access on a cloud-native architecture.',
    highlights: [
      'Governance automation: workflows and compliance across government functions',
      'Finance and HR: budget tracking, payroll, procurement and people in one place',
      'Data integration and analytics: real-time dashboards and reporting',
      'Citizen engagement: transparent portals and real-time tracking of services',
    ],
    url: 'https://eshasan.com',
    host: 'eshasan.com',
    image: '/products/eshasan-visual.png',
    imageAlt: 'The eShasan platform',
    tags: ['eshasan'],
    ne: {
          short: 'सरकार, गैरसरकारी संस्था र उद्यमहरूका लागि एकीकृत ERP प्लेटफर्म।',
          headline: 'eShasan: संस्थागत व्यवस्थापनका लागि एउटै प्लेटफर्म',
          description: 'eShasan ले संस्थागत व्यवस्थापनका सबै पक्षलाई एउटै बुद्धिमान इकोसिस्टममा एकीकृत गर्छ। आवश्यक मोड्युल मात्र छानेर चलाउनुहोस् र आवश्यकता अनुसार विस्तार गर्नुहोस्। क्लाउड-नेटिभ संरचना, भूमिकामा आधारित पहुँच र हरेक कार्यको पूर्ण अडिट ट्रेलसहित।',
          highlights: [
                'शासन स्वचालन: सरकारी कार्यहरूमा सुव्यवस्थित कार्यप्रवाह र अनुपालन',
                'वित्त तथा जनशक्ति व्यवस्थापन: बजेट, पेरोल, खरिद र जनशक्ति एकै ठाउँमा',
                'डेटा एकीकरण र विश्लेषण: रियल-टाइम ड्यासबोर्ड र बुद्धिमान रिपोर्टिङ',
                'नागरिक सहभागिता: पारदर्शी पोर्टल, रियल-टाइम ट्र्याकिङ र सहज सेवा प्रवाह'
          ]
    },
  },
  {
    slug: 'epahichan',
    name: 'ePahichan',
    short: 'Digital signatures for every Nepali, checkable by anyone.',
    headline: 'ePahichan: a digital signature for every Nepali',
    description:
      'ePahichan lets people sign documents electronically in line with Nepal\'s Electronic Transactions Act, 2063. Signing happens in the browser, and any signature can be checked with only the document and the signer\'s public key.',
    highlights: [
      'Digital signatures recognised under Nepal\'s Electronic Transactions Act, 2063',
      'Browser-based signing, with verification that does not depend on ePahichan servers',
      'Signatures that cannot be forged without the private key',
      'Any change to a document after signing is detected',
    ],
    url: 'https://epahichan.com',
    host: 'epahichan.com',
    image: '/products/epahichan-visual.png',
    imageAlt: 'ePahichan signing a document',
    tags: ['epahichan'],
    ne: {
          short: 'हरेक नेपालीका लागि डिजिटल हस्ताक्षर, जुनसुकै व्यक्तिले जाँच्न सक्ने।',
          headline: 'ePahichan: हरेक नेपालीका लागि एउटा डिजिटल हस्ताक्षर',
          description: 'ePahichan ले विद्युतीय कारोबार ऐन, २०६३ अनुसार कागजातमा विद्युतीय हस्ताक्षर गर्न दिन्छ। हस्ताक्षर ब्राउजरमै हुन्छ, र कागजात तथा हस्ताक्षरकर्ताको सार्वजनिक कुञ्जी मात्र प्रयोग गरेर जुनसुकै हस्ताक्षर प्रमाणित गर्न सकिन्छ।',
          highlights: [
                'विद्युतीय कारोबार ऐन, २०६३ अनुसार मान्यता प्राप्त डिजिटल हस्ताक्षर',
                'ब्राउजरमै हस्ताक्षर, ePahichan का सर्भरमा निर्भर नहुने प्रमाणीकरण',
                'निजी कुञ्जीबिना नक्कली बनाउन नसकिने हस्ताक्षर',
                'हस्ताक्षरपछि कागजातमा भएको जुनसुकै हेरफेर पत्ता लाग्छ'
          ]
    },
  },
  {
    slug: 'airfone',
    name: 'AirFone',
    short: 'A business phone system that answers calls and makes them.',
    headline: 'AirFone: a phone system that answers calls and makes them',
    description:
      'AirFone is a business phone system online, with an AI agent that answers your line in Nepali, day and night, and hands over to your team when it should. Extensions, menus, recording and queues run on your existing number.',
    highlights: [
      'An AI agent that answers your business line in Nepali',
      'Extensions, menus, recording and queues on your existing number',
      'No hardware to install',
      'Calls out for you as well as answering',
    ],
    url: 'https://airfone.app',
    host: 'airfone.app',
    image: '/products/airfone-visual.png',
    imageAlt: 'AirFone',
    tags: ['airfone'],
    ne: {
          short: 'कल उठाउने र कल गर्ने व्यावसायिक फोन प्रणाली।',
          headline: 'AirFone: कल उठाउने र कल गर्ने फोन प्रणाली',
          description: 'AirFone अनलाइन चल्ने व्यावसायिक फोन प्रणाली हो। यसमा तपाईंको लाइन दिनरात नेपालीमा उठाउने एआई एजेन्ट छ, र आवश्यक पर्दा कल तपाईंको टोलीलाई हस्तान्तरण गर्छ। एक्सटेन्सन, मेनु, रेकर्डिङ र क्यु तपाईंको अहिलेकै नम्बरमा चल्छन्।',
          highlights: [
                'तपाईंको व्यावसायिक लाइन नेपालीमा उठाउने एआई एजेन्ट',
                'अहिलेकै नम्बरमा एक्सटेन्सन, मेनु, रेकर्डिङ र क्यु',
                'कुनै हार्डवेयर जडान गर्नु पर्दैन',
                'कल उठाउनुका साथै तपाईंका लागि कल पनि गर्छ'
          ]
    },
  },
  {
    slug: 'lunaiot',
    name: 'LunaIoT',
    short: 'GPS vehicle tracking and IoT, built in Nepal.',
    headline: 'LunaIoT: GPS tracking and IoT built in Nepal',
    description:
      'LunaIoT is a GPS vehicle tracking and IoT platform for fleet management and smart tracking in Nepal and abroad. It runs through the Luna IoT app, with vehicle status, trips and fleet views for organisations and government bodies.',
    highlights: [
      'Real-time vehicle tracking with running, idle and stopped status',
      'Fleet management for organisations and government bodies',
      'Trip distance, fuel, odometer and altitude at a glance',
      'Designed and built in Nepal',
    ],
    url: 'https://mylunago.com',
    host: 'mylunago.com',
    image: '/products/luna-iot-visual.jpg',
    imageAlt: 'The Luna IoT app',
    tags: ['lunaiot'],
    ne: {
          short: 'नेपालमै बनेको GPS सवारी ट्र्याकिङ र IoT।',
          headline: 'LunaIoT: नेपालमै बनेको GPS ट्र्याकिङ र IoT',
          description: 'LunaIoT नेपाल र विदेशमा फ्लिट व्यवस्थापन र स्मार्ट ट्र्याकिङ सेवाका लागि स्वदेशी GPS सवारी ट्र्याकिङ तथा IoT प्लेटफर्म हो। Luna IoT एपमार्फत यसले सवारीको अवस्था, यात्रा र फ्लिट हेर्ने सुविधा दिन्छ।',
          highlights: [
                'चलिरहेको, निष्क्रिय र रोकिएको अवस्थासहित रियल-टाइम सवारी ट्र्याकिङ',
                'संस्था र सरकारी निकायका लागि फ्लिट व्यवस्थापन',
                'दूरी, इन्धन, ओडोमिटर र उचाइ एकै नजरमा',
                'नेपालमै डिजाइन र निर्माण'
          ]
    },
  },
  {
    slug: 'lunacam',
    name: 'LunaCam',
    short: 'Watch any DVR or camera from your phone, with video kept in Nepal.',
    headline: 'LunaCam: watch any camera from your phone',
    description:
      'LunaCam is a multi-vendor camera platform for Nepal. It connects cameras and recorders from different makers without router settings, keeps recordings and evidence in Nepal, and sends alerts to your phone.',
    highlights: [
      'Works with cameras and DVRs from different vendors',
      'A small box on your network connects cameras without router settings',
      'Recording and evidence kept in Nepal',
      'Alerts and vision, with a developer platform',
    ],
    url: 'https://lunacam.app',
    host: 'lunacam.app',
    tags: ['lunacam'],
    ne: {
          short: 'कुनै पनि DVR वा क्यामेरा मोबाइलबाट हेर्नुहोस्, भिडियो नेपालमै रहन्छ।',
          headline: 'LunaCam: कुनै पनि क्यामेरा मोबाइलबाट हेर्नुहोस्',
          description: 'LunaCam नेपालका लागि बहु-कम्पनी क्यामेरा प्लेटफर्म हो। यसले फरक-फरक कम्पनीका क्यामेरा र रेकर्डरलाई राउटर सेटिङ बिना जोड्छ, रेकर्डिङ र प्रमाण नेपालमै राख्छ, र अलर्ट तपाईंको फोनमा पठाउँछ।',
          highlights: [
                'विभिन्न कम्पनीका क्यामेरा र DVR सँग काम गर्छ',
                'राउटर सेटिङ बिना क्यामेरा जोड्ने सानो बक्स',
                'रेकर्डिङ र प्रमाण नेपालमै राखिन्छ',
                'अलर्ट र भिजन, डेभलपर प्लेटफर्मसहित'
          ]
    },
  },
];

export const productBySlug = (slug: string) => products.find((p) => p.slug === slug);
