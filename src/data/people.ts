// The people behind the company. Names, titles, bios and photos come from the
// old site's own team data. A person without a photo shows their initials.
// To add someone, add an entry here and put the photo in public/people/.
export interface Person {
  slug: string;
  name: string;
  role: string;
  bio: string;
  photo?: string;
  linkedin?: string;
}

const fallback: Person[] = [
  {
    slug: 'ramesh-chhetri',
    name: 'Ramesh Chhetri',
    role: 'Founder and CEO',
    photo: '/people/ramesh-chhetri.webp',
    linkedin: 'https://www.linkedin.com/in/rameshchhetriofficial/',
    bio: "Ramesh drives Ninja Infosys's vision for what government technology can be: not just functional, but trustworthy. Under his leadership the company has taken on e-governance systems used by citizens, always closing the gap between technical craft and the practical realities institutions face. He believes the best technology disappears into the background, and measures every product against one question: does it make people's lives easier?",
  },
  {
    slug: 'trilochan-bhusal',
    name: 'Trilochan Bhusal',
    role: 'Chief Technology Officer',
    bio: 'Leads the technical direction at Ninja Infosys, with a decade of experience building scalable enterprise systems and high-performance engineering teams.',
  },
];

export const initials = (name: string) =>
  name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();

// DCM snapshot written by scripts/fetch-people.mjs at build time. When it has
// people, it replaces the fallback above.
const snapshots = import.meta.glob<{ leadership: Person[]; team: Person[] }>('./people.generated.json', { eager: true, import: 'default' });
const snap = Object.values(snapshots)[0];

export const leadership: Person[] = snap?.leadership?.length ? snap.leadership : fallback;
export const team: Person[] = snap?.team ?? [];
export const people: Person[] = [...leadership, ...team];
