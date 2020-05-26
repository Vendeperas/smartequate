import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { CompareComponent } from './compare/compare.component';
import { LoginComponent } from './login/login.component';
import { OauthGuard } from './oauth-guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [OauthGuard]
  },
  {
    path: 'search',
    component: SearchComponent,
    canActivate: [OauthGuard]
  },
  {
    path: 'compare',
    component: CompareComponent,
    canActivate: [OauthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
