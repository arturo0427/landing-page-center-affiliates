const FLAG_ES = '/assets/images/flags/es.svg';
const FLAG_EN = '/assets/images/flags/us.svg';

export type LanguageType = {
  name: string;
  flag: string;
  code: string;
};

export const AVAILABLE_LANGUAGES = {
  ES: 'es',
  EN: 'en',
} as const;

export const NAVBAR_SECTIONS = [
  {
    id: 'home',
    label: 'HOME',
    url: '/',
  },
  {
    id: 'player',
    label: 'PLAYER',
    url: '#player',
  },
  {
    id: 'benefits',
    label: 'BENEFITS',
    url: '#benefits',
  },
];

export const LANGUAGES: LanguageType[] = [
  {
    name: 'Español',
    flag: FLAG_ES,
    code: 'es',
  },
  {
    name: 'English',
    flag: FLAG_EN,
    code: 'en',
  },
];

export const LANGUAGE_TO_FLAG_MAP: { [key: string]: string } = {
  en: 'us',
  es: 'es',
};
