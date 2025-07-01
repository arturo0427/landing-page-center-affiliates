import { IndividualConfig } from 'ngx-toastr';

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

export const DEFAULT_INDIVIDUAL_TOASTR_CONFIG: Partial<IndividualConfig<any>> =
  {
    positionClass: 'custom-toastr-top',
    closeButton: true,
    progressBar: true,
    timeOut: 3000,
    easeTime: 500,
    easing: 'ease-in-out',
    progressAnimation: 'decreasing',
  };

export const BENEFITS = [
  {
    id: '1',
    title: 'EXCLUSIVE_BONUSES',
    description: '',
    image: '/assets/images/icons/bonosexclusivos.png',
  },
  {
    id: '2',
    title: 'HIGH_PROBABILITY',
    description: '',
    image: '/assets/images/icons/diamont.png',
  },
  {
    id: '3',
    title: 'PROGRAMS',
    description: '',
    image: '/assets/images/icons/programasderecomendaciones.png',
  },
  {
    id: '4',
    title: 'CUSTOMER_SERVICE',
    description: '',
    image: '/assets/images/icons/call-center.png',
  },
  {
    id: '5',
    title: 'IMMEDIATE_RECHARGES',
    description: '',
    image: '/assets/images/icons/recargasinmediatas.png',
  },
  {
    id: '6',
    title: 'INSTANT_PAYMENTS',
    description: '',
    image: '/assets/images/icons/pagosalinstante.png',
  },
  {
    id: '7',
    title: 'BEST_ODDS',
    description: '',
    image: '/assets/images/icons/mejorescuotas.png',
  },
  {
    id: '8',
    title: 'CASHOUT',
    description: '',
    image: '/assets/images/icons/cashout.png',
  },
  {
    id: '9',
    title: 'SPECIAL_OFFERS',
    description: '',
    image: '/assets/images/icons/promocionesespeciales.png',
  },
];
