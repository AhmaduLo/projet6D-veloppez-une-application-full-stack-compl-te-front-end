import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./pages/home/home.component";
import { AccueilComponent } from "./components/accueil/accueil.component";
import { RegisterComponent } from "./components/authComponent/register/register.component";
import { LoginComponent } from "./components/authComponent/login/login.component";
import { HeaderComponent } from "./components/header/header.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AuthInterceptor } from "./services/interceptors/auth.interceptor";
import { ThemeComponent } from './components/theme/theme.component';
import { ProfilComponent } from './components/profil/profil.component';
import { ArticlePageComponent } from './pages/article/article-page.component';
import { ArticlesComponent } from "./components/article/article.component";
import { CommentaireComponent } from './components/commentaire/commentaire.component';
import { ArticleDetailComponent } from './pages/article-detail/article-detail.component';
import { NewArticleComponent } from './pages/new-article/new-article.component';
import { NouvArticleComponent } from "./components/newArticle/nouv-article.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AccueilComponent,
    RegisterComponent,
    LoginComponent,
    HeaderComponent,
    ArticlePageComponent,
    ThemeComponent,
    ProfilComponent,
    ArticlePageComponent,
    ArticlesComponent,
    CommentaireComponent,
    ArticleDetailComponent,
    NouvArticleComponent,
    NewArticleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
