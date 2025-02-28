import type { Mentor } from '@/interfaces/mentor';
import { useMemo } from 'react';
import {useTranslation} from "next-i18next";
import {useRouter} from "next/router";

const useMentorData = () => {

  const { t } = useTranslation('common');
  const { locale } = useRouter();
  const isRtl = locale === 'ar';


  const data: Array<Mentor> = useMemo(() => [
    {
      id: 1,
      photo: '/images/mentors/christian-buehner-DItYlc26zVI-unsplash.jpg',
      name: 'Jhon Dwirian',
      category: 'UI/UX Design',
      description:
          'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      company: {
        name: 'Grab',
        logo: '/images/companies/grab.png',
      },
    },
    {
      id: 2,
      photo: '/images/mentors/jonas-kakaroto-KIPqvvTOC1s-unsplash.jpg',
      name: 'Leon S Kennedy',
      category: 'Machine Learning',
      description:
          'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      company: {
        name: 'Google',
        logo: '/images/companies/google.png',
      },
    },
    {
      id: 3,
      photo: '/images/mentors/noah-buscher-8A7fD6Y5VF8-unsplash.jpg',
      name: 'Nguyễn Thuy',
      category: 'Android Development',
      description:
          'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      company: {
        name: 'Airbnb',
        logo: '/images/companies/airbnb.png',
      },
    },
    {
      id: 4,
      photo: '/images/mentors/philip-martin-5aGUyCW_PJw-unsplash.jpg',
      name: 'Rizki Known',
      category: 'Fullstack Development',
      description:
          'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      company: {
        name: 'Microsoft',
        logo: '/images/companies/microsoft.png',
      },
    },
  ], [t]);

  return { data, isRtl };
};

export default useMentorData;