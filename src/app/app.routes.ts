import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'gadgets',
    loadComponent: () =>
      import('./pages/gadgets/gadgets.page').then(m => m.GadgetsPage),
    canActivate: [authGuard]
  },
  {
    path: 'gadget-form',
    loadComponent: () =>
      import('./pages/gadget-form/gadget-form.page').then(m => m.GadgetFormPage),
    canActivate: [authGuard]
  },
  {
    path: 'gadget-form/:id',
    loadComponent: () =>
      import('./pages/gadget-form/gadget-form.page').then(m => m.GadgetFormPage),
    canActivate: [authGuard]
  },
  {
    path: 'gadget-detalle/:id',
    loadComponent: () =>
      import('./pages/gadget-detalle/gadget-detalle.page').then(m => m.GadgetDetallePage),
    canActivate: [authGuard]
  }
];
