export const POLL_INTERVAL = parseInt(
  process.env.NEXT_PUBLIC_POLL_INTERVAL || '30000'
);

export const SLIDESHOW_INTERVAL = parseInt(
  process.env.NEXT_PUBLIC_SLIDESHOW_INTERVAL || '8000'
);

export const HIGH_VALUE_THRESHOLD = parseInt(
  process.env.NEXT_PUBLIC_HIGH_VALUE_THRESHOLD || '3999'
);

export const COMPANY_INFO = {
  name: 'A&N Global Exchange',
  phone: '+357 96 331517',
  phoneDisplay: '96331517',
  whatsapp: 'https://wa.me/35796331517',
  address: 'Ledras 139, Nicosia 1011, Cyprus',
  hours: '10:00 AM - 8:00 PM',
  registration: 'HE 445408',
  established: '2023',
} as const;

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
  { href: '/loyalty-card', label: 'Loyalty Card' },
] as const;
