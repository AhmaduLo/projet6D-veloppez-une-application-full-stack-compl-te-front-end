import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accueil',
  template: `
   <div class="container">
  <img src="/assets/logo_p6.png" alt="MDD Logo" class="logo" />

  <div class="button-group">
    <button (click)="goToLogin()">Se connecter</button>
    <button (click)="goToRegister()">S’inscrire</button>
  </div>
</div>
  `,
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  constructor(private router: Router) { }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {}

}
