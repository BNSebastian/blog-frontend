import { Routes } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // home
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./shared/components/home.component').then((m) => m.HomeComponent),
  },
  // security
  {
    path: 'user',
    children: [
      {
        path: 'signup',
        loadComponent: () =>
          import('./core/components/ui/signup-page.component').then(
            (m) => m.SignupPageComponent
          ),
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./core/components/ui/login-page.component').then(
            (m) => m.LoginPageComponent
          ),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./core/components/ui/profile-page.component').then(
            (m) => m.ProfilePageComponent
          ),
        canActivate: [AuthGuard],
      },
    ],
  },
  // features
  {
    path: 'video',
    loadComponent: () =>
      import('./features/components/videos/video-list.component').then(
        (m) => m.VideoComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'video/:name',
    loadComponent: () =>
      import('./features/components/videos/video-player.component').then(
        (m) => m.VideoPlayerComponent
      ),
    canActivate: [AuthGuard],
  },
  // {
  //   path: 'video/:name',
  //   loadComponent: () =>
  //     import('./features/components/comments/comments.component').then(
  //       (m) => m.CommentsComponent
  //     ),
  //   canActivate: [AuthGuard],
  //   children: [
  //     // {
  //     //   path: '',
  //     //   loadComponent: () =>
  //     //     import(
  //     //       './features/components/videos/video-comments/video-comments.component'
  //     //     ).then((m) => m.VideoCommentsComponent),
  //     //   canActivate: [AuthGuard],
  //     // },
  //   ],
  // },
  // admin features
  {
    path: 'admin/videoUpload',
    loadComponent: () =>
      import('./features/components/videos/video-upload.component').then(
        (m) => m.VideoUploadComponent
      ),
    canActivate: [AuthGuard],
  },
];
