import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accueil',
  template: `
   <div class="container">
  <img src="/assets/logo_p6.png" alt="MDD Logo" class="logo" />

  <div class="button-group">
    <button>Se connecter</button>
    <button>S’inscrire</button>
  </div>
</div>
  `,
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
