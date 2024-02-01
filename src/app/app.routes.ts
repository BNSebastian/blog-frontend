import { Routes } from '@angular/router';

import { AdminGuard } from './core/guards/admin.guard';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  /* HOME
   ******************************/
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

  /* AUTHENTICATION
   ******************************/
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

  /* VIDEOS
   ******************************/
  {
    path: 'video',
    loadComponent: () =>
      import('./features/components/video/video-list.component').then(
        (m) => m.VideoComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'video/:name',
    loadComponent: () =>
      import('./features/components/video/video-player.component').then(
        (m) => m.VideoPlayerComponent
      ),
    canActivate: [AuthGuard],
  },

  /* CHAT
   ******************************/
  {
    path: 'chat',
    loadComponent: () =>
      import('./features/components/chat/chat.component').then(
        (m) => m.ChatComponent
      ),
    canActivate: [AuthGuard],
  },

  /* FORUM
   ******************************/
  {
    path: 'forum',
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('./features/components/forum/forum-posts.component').then(
            (m) => m.ForumPostsComponent
          ),
        canActivate: [AuthGuard],
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./features/components/forum/forum-post.component').then(
            (m) => m.ForumPostComponent
          ),
        canActivate: [AuthGuard],
      },
    ],
  },

  /* FORUM
   ******************************/
  {
    path: 'articles',
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('./features/components/articles/articles.component').then(
            (m) => m.ArticlesComponent
          ),
        canActivate: [AuthGuard],
      },
    ],
  },

  /* ADMIN
   ******************************/
  {
    path: 'admin',
    children: [
      {
        path: 'uploadVideos',
        pathMatch: 'full',
        loadComponent: () =>
          import('./features/components/video/video-upload.component').then(
            (m) => m.VideoUploadComponent
          ),
        canActivate: [AdminGuard],
      },
      {
        path: 'manageVideos',
        pathMatch: 'full',
        loadComponent: () =>
          import('./features/components/video/admin-video-list.component').then(
            (m) => m.AdminVideoListComponent
          ),
        canActivate: [AdminGuard],
      },
      {
        path: 'manageVideos/:name',
        pathMatch: 'full',
        loadComponent: () =>
          import('./features/components/video/admin-video-edit.component').then(
            (m) => m.AdminVideoEditComponent
          ),
        canActivate: [AdminGuard],
      },
    ],
  },

  /* PAYMENT
   ******************************/
  {
    path: 'donate',
    loadComponent: () =>
      import('./features/components/paypal/payment-form.component').then(
        (m) => m.PaymentForm
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'donateSuccess',
    loadComponent: () =>
      import('./features/components/paypal/payment-success.component').then(
        (m) => m.PaymentSuccess
      ),
    canActivate: [AuthGuard],
  },

  /* ERRORS
   ******************************/
  {
    path: '401',
    loadComponent: () =>
      import('./core/components/errors/UnauthorizedAccess').then(
        (m) => m.UnauthorizedAccessComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./core/components/errors/PageNotFound').then(
        (m) => m.PageNotFoundComponent
      ),
    canActivate: [AuthGuard],
  },
];
