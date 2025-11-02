import { Route } from '@angular/router';
import { HomeComponent } from './home.component';

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
    component: HomeComponent,
  },
];
