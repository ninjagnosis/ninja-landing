// The five products in the group. One source for the product pages, the
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
  },
];

export const productBySlug = (slug: string) => products.find((p) => p.slug === slug);
