import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth-service.service';

@Component({
  selector: 'app-header',
  template: `
    <header class="header">
  <img src="/assets/logo_p6.png" alt="Logo MDD" class="logo" />

  <div class="sowMenuAfterConnect" *ngIf="isAuthenticated">
  <!-- Menu desktop -->
  <nav class="nav-links desktop" >
    <a (click)="logout()"  class="logout">Se déconnecter</a>
    <a routerLink="/article" routerLinkActive="active-link">Articles</a>
    <a routerLink="/theme" routerLinkActive="active-link">Thèmes</a>
    <img src="assets/profil.png" alt="Profil" class="profile-icon" routerLink="/profil" />
  </nav>

  <!-- Icône burger menu mobile -->
  <button class="burger" (click)="toggleMenu()" >
    <img  *ngIf="!showMobileMenu" src="assets/menu.png" alt="Menu" />
     <img *ngIf="showMobileMenu" src="assets/croix.png" alt="Fermer le menu" />
  </button>

 

  <!-- Menu mobile -->
  <nav class="nav-links mobile" *ngIf="showMobileMenu" >
    <a (click)="logout()"  class="logout">Se déconnecter</a>
    <a routerLink="/article" routerLinkActive="active-link">Articles</a>
    <a routerLink="/theme" routerLinkActive="active-link">Thèmes</a>
    <img src="assets/profil.png" alt="Profil" class="profile-icon" routerLink="/profil"/>
  </nav>
  </div>
</header>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuthenticated: boolean = false;

  constructor(private authService: AuthService, private router: Router,) { }

  showMobileMenu = false;

  toggleMenu(): void {
    this.showMobileMenu = !this.showMobileMenu;

  }

  ngOnInit(): void {
    this.authService.isLoggedIn$().subscribe(status => {
      this.isAuthenticated = status;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(["/login"]); // ou router.navigate(['/'])
  }


}
