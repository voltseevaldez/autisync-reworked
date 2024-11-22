import {
  ActivityRoom,
  ChooseActivity,
  ChooseDifficulty,
  ForgotPassword,
  Login,
  NotFound,
  SignUp,
} from '~/pages';
import { Forms } from '~/pages/Admin';
import {
  AcademicActivityChat,
  Activity,
  // Activity,
  BadgesEmpty,
  BadgesPage,
  CategoryList,
  CompletedActivity,
  DifficultyPage,
  Home2,
  Home as LegacyHome,
  LegacySignUp,
  LegcyLogin,
  RoomCoop,
  RoomSolo,
} from '~/pages/Legacy';
import { IPage } from '~/types';

export const Pages: IPage[] = [
  { path: '/', Component: Login, requireAuth: false, requireAdmin: false },
  {
    path: '/sign-up',
    Component: SignUp,
    requireAuth: false,
    requireAdmin: false,
  },
  {
    path: '/forgot-password',
    Component: ForgotPassword,
    requireAuth: false,
    requireAdmin: false,
  },
  { path: '*', Component: NotFound, requireAuth: false, requireAdmin: false },

  // Reworked Pages
  {
    path: '/quiz/category',
    Component: CategoryList,
    requireAuth: true,
    requireAdmin: false,
  },
  {
    path: '/quiz/:category/difficulty',
    Component: ChooseDifficulty,
    requireAuth: true,
    requireAdmin: false,
  },
  {
    path: '/quiz/:category/:difficulty/choose',
    Component: ChooseActivity,
    requireAuth: true,
    requireAdmin: false,
  },
  {
    path: '/activity/:activityId/create-room',
    Component: RoomCoop,
    requireAuth: true,
    requireAdmin: false,
  },

  {
    path: '/room/:roomId',
    Component: ActivityRoom,
    requireAuth: true,
    requireAdmin: false,
  },

  {
    path: '/activity/:activityId/:roomId',
    Component: Activity,
    requireAuth: true,
    requireAdmin: false,
  },

  {
    path: '/forms',
    Component: Forms,
    requireAuth: true,
    requireAdmin: true,
  },
  // Legacy pages

  // {
  //   path: '/legacy/category-list',
  //   Component: CategoryList,
  //   requireAuth: false,
  //   requireAdmin: false,
  // },

  // {
  //   path: '/legacy/academic-activity1',
  //   Component: Activity,
  //   requireAuth: false,
  //   requireAdmin: false,
  // },

  {
    path: '/legacy/academic-activity-chat',
    Component: AcademicActivityChat,
    requireAuth: false,
    requireAdmin: false,
  },
  {
    path: '/legacy/badges-empty',
    Component: BadgesEmpty,
    requireAuth: false,
    requireAdmin: false,
  },
  {
    path: '/legacy/badges-page',
    Component: BadgesPage,
    requireAuth: false,
    requireAdmin: false,
  },
  {
    path: '/legacy/completed-activity',
    Component: CompletedActivity,
    requireAuth: false,
    requireAdmin: false,
  },
  {
    path: '/legacy/difficulty-page',
    Component: DifficultyPage,
    requireAuth: false,
    requireAdmin: false,
  },
  {
    path: '/legacy/home',
    Component: LegacyHome,
    requireAuth: false,
    requireAdmin: false,
  },
  {
    path: '/legacy/home2',
    Component: Home2,
    requireAuth: true,
    requireAdmin: false,
  },
  {
    path: '/legacy/login',
    Component: LegcyLogin,
    requireAuth: false,
    requireAdmin: false,
  },
  {
    path: '/legacy/room-coop',
    Component: RoomCoop,
    requireAuth: false,
    requireAdmin: false,
  },
  {
    path: '/legacy/room-solo',
    Component: RoomSolo,
    requireAuth: false,
    requireAdmin: false,
  },
  {
    path: '/legacy/sign-up',
    Component: LegacySignUp,
    requireAuth: false,
    requireAdmin: false,
  },
];
