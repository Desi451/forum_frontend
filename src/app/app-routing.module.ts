import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { PageForbiddenComponent } from './shared/page-forbidden/page-forbidden.component';
import { HomeComponent } from './shared/home/home.component';

const routes: Routes = [
  {
    path: 'forbidden',
    component: PageForbiddenComponent
  },
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule) // Lazy loading
  },
  {
    path: 'threads',
    loadChildren: () => import('./threads/threads.module').then(m => m.ThreadsModule) // Lazy loading
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) // Lazy loading
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
