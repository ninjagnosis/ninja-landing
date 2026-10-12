// Shared facts for the legal pages. One place, so the three pages agree.
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, LLC_ADDRESS, NEPAL, NEPAL_ADDRESS } from '../../config/site';

export const UPDATED = 'Last updated 12 October 2026';
export const mail = `<a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>`;
export const addresses = `Ninja Infosys LLC, ${LLC_ADDRESS}, and ${NEPAL.legalName}, ${NEPAL_ADDRESS}`;
export const phone = CONTACT_PHONE_DISPLAY;
