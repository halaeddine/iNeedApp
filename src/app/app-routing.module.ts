import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes,PreloadingStrategy,Route } from '@angular/router';
import { Observable, of } from 'rxjs';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'dashboard',
    // canActivate: [AuthGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  
  {
   path: 'businessdetails/:id',
    loadChildren: () => import('./businessdetails/businessdetails.module').then( m => m.BusinessdetailsPageModule)
  },

  {
    path: 'businesses/:id',
    loadChildren: () => import('./businesses/businesses.module').then( m => m.BusinessesPageModule)
  },
  {
    path: 'my-profile',
    loadChildren: () => import('./my-profile/my-profile.module').then( m => m.MyProfilePageModule)
  },
  {
    path: 'my-businesses',
    loadChildren: () => import('./my-businesses/my-businesses.module').then( m => m.MyBusinessesPageModule)
  }

];

export class SimpleLoadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: Function): Observable<any> {
    if (route.data && route.data.preload) {
      return load();
    }
    return of(null);
  }
}

@NgModule({
  providers: [SimpleLoadingStrategy],
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}


