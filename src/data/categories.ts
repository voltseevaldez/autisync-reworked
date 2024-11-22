export interface ICategory {
  imageLink: string;
  name: string;
  link: string;
  categoryLogoLink: string;
}

export const categories: ICategory[] = [
  // ? First row
  {
    imageLink: '/assets/images/academic.png',
    name: 'Academic',
    link: '/quiz/academic/difficulty',
    categoryLogoLink: '/assets/images/academic-logo.png',
  },
  {
    imageLink: '/assets/images/social.png',
    name: 'Social',
    link: '/quiz/social/difficulty',
    categoryLogoLink: '/assets/images/academic-logo.png',
  },
  {
    imageLink: '/assets/images/objects.png',
    name: 'Objects',
    link: '/quiz/objects/difficulty',
    categoryLogoLink: '/assets/images/academic-logo.png',
  },

  // ? Second row
  // {
  //   imageLink: '/assets/images/academic.png',
  //   name: 'Academic',
  // },
  // {
  //   imageLink: '/assets/images/social.png',
  //   name: 'Social',
  // },
  // {
  //   imageLink: '/assets/images/objects.png',
  //   name: 'Objects',
  // },

  // ? Third row
  // {
  //   imageLink: '/assets/images/academic.png',
  //   name: 'Academic',
  // },
  // {
  //   imageLink: '/assets/images/social.png',
  //   name: 'Social',
  // },
  // {
  //   imageLink: '/assets/images/objects.png',
  //   name: 'Objects',
  // },
];
