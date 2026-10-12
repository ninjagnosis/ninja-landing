// Build-time site configuration.

export const SITE_URL = 'https://ninjainfosys.com';
export const SITE_NAME = 'Ninja Infosys LLC';
export const SHORT_NAME = 'Ninja Infosys';

export const CONTACT_EMAIL = 'info@ninjainfosys.com';
export const CONTACT_PHONE_DISPLAY = '+977 985-1343348';
export const CONTACT_PHONE_TEL = 'tel:+9779851343348';
export const CONTACT_PHONE_JSONLD = '+977-9851343348';

/** The company the site is about. */
export const LLC = {
  name: SITE_NAME,
  street: '1500 N Grant St, Ste R',
  locality: 'Denver',
  region: 'CO',
  postalCode: '80203',
  country: 'US',
  countryName: 'United States',
} as const;
export const LLC_ADDRESS = `${LLC.street}, ${LLC.locality}, ${LLC.region} ${LLC.postalCode}, ${LLC.country}`;

/** Certifications held by the company. Add the certifying body and number here when they are available. */
export const CERTIFICATIONS = [
  { name: 'ISO 9001:2015', description: 'Quality management systems' },
] as const;
export const CERTIFIED_LINE = `Certified to ${CERTIFICATIONS.map((c) => c.name).join(' and ')}.`;

/**
 * The Nepal entity. One supporting line in the footer, contact and legal
 * pages. Registration details are shown only when they are filled in.
 */
export const NEPAL = {
  legalName: 'Ninja Infosys Pvt. Ltd.',
  street: 'Anamnagar',
  locality: 'Kathmandu',
  countryName: 'Nepal',
  registrationNumber: null as string | null,
  panNumber: null as string | null,
} as const;
export const NEPAL_ADDRESS = `${NEPAL.street}, ${NEPAL.locality}`;
export const NEPAL_LINE = `Ninja Infosys LLC also operates through ${NEPAL.legalName}, a private limited company in ${NEPAL.locality}.`;
