// Awards and press coverage. Facts come from the award submission and from the
// coverage listed below. Headlines are summarised in English; each link goes to
// the original article, in the language noted.
export interface Photo { src: string; alt: string }

export const asocio = {
  name: 'ASOCIO Digital Government Award 2025',
  date: '2025-11-11',
  place: 'ASOCIO Digital Summit, Taipei, Taiwan',
  photos: [
    { src: '/media/asocio-2025.webp', alt: 'Ninja Infosys on stage at the ASOCIO Awards 2025 in Taipei' },
    { src: '/media/asocio-2025-b.webp', alt: 'Receiving the ASOCIO Digital Government Award 2025' },
  ] as Photo[],
};

export interface Award {
  year: string;
  name: string;
  by: string;
  note?: string;
  photo: Photo;
  /** Portrait photos (certificates) get a tall frame instead of the landscape one. */
  portrait?: boolean;
}

// Other recognition, newest first.
export const awards: Award[] = [
  {
    year: '2025',
    name: 'National ICT Award, Provincial/District Private Sector',
    by: 'Government, on the National ICT Day, 2 May 2025, Kathmandu',
    note: 'Presented by the Prime Minister, K.P. Sharma Oli, for Digital Palika. The government gave ICT awards in eight categories that day.',
    photo: { src: '/media/national-ict-2025.webp', alt: 'Receiving the National ICT Award 2025 on stage' },
  },
  {
    year: '2024',
    name: 'Provincial Startup ICT Recognition Award',
    by: 'ICT Award 2024, Lumbini Province',
    note: 'Given to the best startup from each of the seven provinces. Ninja Infosys was recognised for Lumbini Province.',
    photo: { src: '/media/ict-2024.webp', alt: 'Receiving the ICT Award 2024 on stage' },
  },
  {
    year: '2021',
    name: 'Emerging Startup of the Year, Lumbini Province',
    by: 'Kumari Bank NewBiz Startup Summit and Awards, 25 November 2021',
    note: 'Organised by New Business Age in Kathmandu, with one startup honoured from each province.',
    photo: { src: '/media/newbiz-2021.webp', alt: 'The NewBiz Startup Summit and Awards 2021 certificate' },
    portrait: true,
  },
];

export interface Article {
  outlet: string;
  title: string;
  url: string;
  lang: 'en' | 'ne';
  /** YYYY-MM-DD, or YYYY-MM when only the month is known. */
  date?: string;
}

// Newest first.
export const press: Article[] = [
  { outlet: 'Youth Today News', title: 'Honoured at the ASOCIO Awards 2025 in Taiwan', url: 'https://youthtodaynews.com/news/oMQS7hxA-2025-11-15', lang: 'ne', date: '2025-11-15' },
  { outlet: 'Aarthik Voice', title: 'Seven IT companies win awards in Taipei, from Ninja Infosys to Edutech International', url: 'https://aarthikvoice.com/archives/76803', lang: 'ne', date: '2025-11-12' },
  { outlet: 'Nagarik Samaj', title: 'Ninja Infosys receives the Digital Government Award at the ASOCIO Awards 2025', url: 'https://nagariksamaj.com/48518/', lang: 'ne', date: '2025-11-11' },
  { outlet: 'Beema Post', title: 'Seven technology organisations honoured at the ASOCIO Awards 2025', url: 'https://www.beemapost.com/2025/11/197408/%E0%A4%A4%E0%A4%BE%E0%A4%87%E0%A4%B5%E0%A4%BE%E0%A4%A8%E0%A4%AE%E0%A4%BE', lang: 'ne', date: '2025-11' },
  { outlet: 'Nagarik Samaj', title: 'Digital Palika joins CAN Infotech 2025 as an associate partner', url: 'https://nagariksamaj.com/47824/', lang: 'ne' },
  { outlet: 'ICT Frame', title: 'Digital e-Palika awarded for national ICT excellence', url: 'https://ictframe.com/ninja-infosys-digital-e-palika-awarded/', lang: 'en', date: '2025-05-03' },
  { outlet: 'Netrapati', title: 'The government honours Ninja Infosys on National ICT Day', url: 'https://netrapati.com/?p=1217', lang: 'ne', date: '2025-05-02' },
  { outlet: 'ATM Online News', title: 'Ninja Infosys wins a National ICT Award in the provincial private sector category', url: 'https://atmnews.com.np/archives/508', lang: 'ne', date: '2025-05-02' },
  { outlet: 'Desh Sanchar', title: 'ICT Awards presented in eight categories, with photographs', url: 'https://deshsanchar.com/2025/05/02/1041157/', lang: 'ne', date: '2025-05-02' },
  { outlet: 'Nagarik Path', title: 'Ninja Infosys wins the Provincial Startup ICT Recognition 2024 for Lumbini Province', url: 'https://nagarikpath.com/?p=6897', lang: 'ne' },
  { outlet: 'Nagarik Samaj', title: 'Ninja Infosys honoured at the Kumari Bank NewBiz Startup Summit and Awards', url: 'https://nagariksamaj.com/38043/', lang: 'ne' },
  { outlet: 'New Business Age', title: 'Ninja Infosys, startup profile', url: 'https://startup.newbusinessage.com/startups/ninja-infosys/', lang: 'en' },
  { outlet: 'Facebook', title: 'Ninja Infosys on Facebook', url: 'https://www.facebook.com/infosysninja', lang: 'en' },
];

// Short description for journalists, directories and award listings.
export const boilerplate =
  'Ninja Infosys LLC designs, builds and operates software for organisations and the people who depend on them. Its products include eShasan, ePahichan, AirFone, LunaIoT and LunaCam. The company also operates through Ninja Infosys Pvt. Ltd., a private limited company in Kathmandu. Ninja Infosys received the ASOCIO Digital Government Award in 2025.';

export interface KitFile { file: string; label: string; detail: string }
export const pressKit: KitFile[] = [
  { file: 'ninja-infosys-logo.png', label: 'Ninja Infosys logo', detail: 'PNG, 512 by 512' },
  { file: 'asocio-award-2025-on-stage-1.jpg', label: 'ASOCIO Awards 2025, on stage', detail: 'JPG, 1024 by 768' },
  { file: 'asocio-award-2025-on-stage-2.jpg', label: 'ASOCIO Awards 2025, award presentation', detail: 'JPG, 1024 by 768' },
  { file: 'asocio-award-2025-trophy.jpg', label: 'ASOCIO Digital Government Award 2025, trophy', detail: 'JPG, 1024 by 768' },
  { file: 'national-ict-award-2025-ceremony.jpg', label: 'National ICT Award 2025, ceremony', detail: 'JPG, 1536 by 1105' },
  { file: 'provincial-startup-ict-award-2024.jpg', label: 'Provincial Startup ICT Recognition 2024', detail: 'JPG, 1386 by 924' },
  { file: 'newbiz-startup-award-2021-certificate.jpg', label: 'NewBiz Startup Awards 2021, certificate', detail: 'JPG, 1040 by 1386' },
];

export interface Faq { q: string; a: string }
export const faq: Faq[] = [
  {
    q: 'What award did Ninja Infosys receive at ASOCIO 2025?',
    a: 'Ninja Infosys received the ASOCIO Digital Government Award at the ASOCIO Awards 2025, presented on 11 November 2025 at the ASOCIO Digital Summit in Taipei, Taiwan, for Digital Palika.',
  },
  {
    q: 'What is ASOCIO?',
    a: 'ASOCIO is the Asia Oceania Computing Industry Organization, an association of national ICT industry bodies across Asia and Oceania. It holds the ASOCIO Digital Summit and presents the ASOCIO Awards each year.',
  },
  {
    q: 'What is Digital Palika?',
    a: 'Digital Palika is a platform that brings municipal services online for local governments, including civil registration, taxation, building permits, planning, business registration and grievance handling.',
  },
  {
    q: 'What other awards has Ninja Infosys received?',
    a: 'Ninja Infosys received the National ICT Award in 2025 in the provincial and district private sector category, the Provincial Startup ICT Recognition Award in 2024 for Lumbini Province, and the Kumari Bank NewBiz Startup Summit and Awards honour for Emerging Startup of the Year 2021 for Lumbini Province.',
  },
  {
    q: 'Where can I find photographs and a logo for press use?',
    a: 'The press kit on this page has the logo and award photographs for download. For anything else, write to info@ninjainfosys.com.',
  },
];
