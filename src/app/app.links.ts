import { FRONTEND, frontendUrl } from './shared/environments/frontend';
import { LinkInterface } from './shared/models/link';

export const publicLinks: LinkInterface[] = [
  {
    name: 'home',
    tooltip: 'Home',
    icon: 'home',
    color: 'primary',
    highlight: 'mat-accent',
    url: frontendUrl.home,
  },
  {
    name: 'signup',
    tooltip: 'Register a new account',
    icon: 'person_add',
    color: 'primary',
    highlight: 'mat-accent',
    url: frontendUrl.signup,
  },
  {
    name: 'login',
    tooltip: 'Sign in',
    icon: 'login',
    color: 'primary',
    highlight: 'mat-accent',
    url: frontendUrl.login,
  },
];

export const authenticatedLinks: LinkInterface[] = [
  {
    name: 'home',
    tooltip: 'Home',
    icon: 'home',
    color: 'primary',
    highlight: 'mat-accent',
    url: frontendUrl.home,
  },
  {
    name: 'videos',
    tooltip: 'Videos',
    icon: 'play_circle',
    color: 'primary',
    highlight: 'mat-accent',
    url: frontendUrl.videos,
  },
  {
    name: 'articles',
    tooltip: 'Articles',
    icon: 'library_books',
    color: 'primary',
    highlight: 'mat-accent',
    url: FRONTEND.getArticles(),
  },
  {
    name: 'forum',
    tooltip: 'Forum',
    icon: 'forum',
    color: 'primary',
    highlight: 'mat-accent',
    url: FRONTEND.getForum(),
  },
  // {
  //   name: 'chat',
  //   tooltip: 'Chat',
  //   icon: 'chat',
  //   color: 'primary',
  //   highlight: 'mat-accent',
  //   url: FRONTEND.getChat(),
  // },
  {
    name: 'profile',
    tooltip: 'User profile',
    icon: 'manage_accounts',
    color: 'primary',
    highlight: 'mat-accent',
    url: frontendUrl.profile,
  },
  {
    name: 'donate',
    tooltip: 'Donate',
    icon: 'savings',
    color: 'primary',
    highlight: 'mat-accent',
    url: FRONTEND.getDonatePage(),
  },
  {
    name: 'logout',
    tooltip: 'Log out',
    icon: 'logout',
    color: 'primary',
    highlight: 'primary',
    url: frontendUrl.home,
  },
];

export const adminLinks: any = [
  {
    name: 'Upload videos',
    tooltip: 'Video upload',
    icon: 'upload_file',
    color: 'warn',
    highlight: 'mat-accent',
    url: FRONTEND.uploadVideos(),
  },
  {
    name: 'Manage videos',
    tooltip:
      'Edit the name, description and video data of existing videos or delete them altogether',
    icon: 'edit_Document',
    color: 'warn',
    highlight: 'mat-accent',
    url: FRONTEND.manageVideos(),
  },
  {
    name: 'Manage articles',
    tooltip:
      'Create new articles or edit the name, and content of existing ones.',
    icon: 'edit_Document',
    color: 'warn',
    highlight: 'mat-accent',
    url: FRONTEND.manageArticles(),
  },
];
