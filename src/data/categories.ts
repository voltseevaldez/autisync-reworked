export interface ICategory {
  imageLink: string;
  name: string;
  link: string;
  categoryLogoLink: string;
}

export const categories: ICategory[] = [
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
  {
    imageLink: '/assets/images/food.png',
    name: 'Food',
    link: '/quiz/food/difficulty',
    categoryLogoLink: '/assets/images/academic-logo.png',
  },
  {
    imageLink: '/assets/images/action.png',
    name: 'Actions',
    link: '/quiz/actions/difficulty',
    categoryLogoLink: '/assets/images/academic-logo.png',
  },
];
