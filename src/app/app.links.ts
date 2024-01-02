import { frontendUrl } from './shared/environments/frontend';
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

export const userLinks: LinkInterface[] = [
  {
    name: 'home',
    tooltip: 'Home',
    icon: 'home',
    color: 'primary',
    highlight: 'mat-accent',
    url: frontendUrl.home,
  },
  {
    name: 'profile',
    tooltip: 'User profile',
    icon: 'account_circle',
    color: 'primary',
    highlight: 'mat-accent',
    url: frontendUrl.profile,
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
    name: 'chat',
    tooltip: 'Chat',
    icon: 'chat',
    color: 'primary',
    highlight: 'mat-accent',
    url: frontendUrl.chat,
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
    name: 'Video upload',
    tooltip: 'Video upload',
    icon: 'upload_file',
    color: 'warn',
    highlight: 'mat-accent',
    url: frontendUrl.videoUpload,
  },
];
