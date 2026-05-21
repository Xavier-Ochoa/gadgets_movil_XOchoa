import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'gadgets',
    pathMatch: 'full'
  },
  {
    path: 'gadgets',
    loadComponent: () =>
      import('./pages/gadgets/gadgets.page').then(m => m.GadgetsPage)
  },
  {
    path: 'gadget-form',
    loadComponent: () =>
      import('./pages/gadget-form/gadget-form.page').then(m => m.GadgetFormPage)
  },
  {
    path: 'gadget-form/:id',
    loadComponent: () =>
      import('./pages/gadget-form/gadget-form.page').then(m => m.GadgetFormPage)
  },
  {
    path: 'gadget-detalle/:id',
    loadComponent: () =>
      import('./pages/gadget-detalle/gadget-detalle.page').then(m => m.GadgetDetallePage)
  }
];
