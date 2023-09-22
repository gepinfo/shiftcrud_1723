import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },
  { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
  { path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) },
  { path: 'management', loadChildren: () => import('./management/management.module').then(m => m.ManagementModule) },
{ path : 'tickets', loadChildren: () => import('./tickets/tickets.module').then(m => m.TicketsModule) } , 
{ path : 'types', loadChildren: () => import('./types/types.module').then(m => m.TypesModule) } , 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
