import { NxWelcome } from './nx-welcome';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'product',
    loadChildren: () => import('product/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: 'user',
    loadChildren: () => import('user/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: '',
    component: NxWelcome,
  },
];
