import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { RegisterComponent } from './components/authComponent/register/register.component';
import { LoginComponent } from './components/authComponent/login/login.component';
import { ThemeComponent } from './components/theme/theme.component';
import { ProfilComponent } from './components/profil/profil.component';
import { ArticlePageComponent } from './pages/article/article-page.component';

// consider a guard combined with canLoad / canActivate route option
// to manage unauthenticated user to access private routes
const routes: Routes = [
  {
    path: '',
    component: AccueilComponent
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'article',
    component: ArticlePageComponent,
  },
  {
    path: 'theme',
    component: ThemeComponent
  },
  {
    path: 'profil',
    component: ProfilComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
