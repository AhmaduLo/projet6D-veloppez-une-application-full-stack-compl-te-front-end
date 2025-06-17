import { Component, OnInit } from "@angular/core";
import { Theme } from "src/app/models/theme.model";
import { ThemeService } from "src/app/services/themeservices/theme-service.service";

@Component({
  selector: "app-theme",
  template: `
    <div class="themes-container">
  <div *ngFor="let theme of themes" class="theme-card">
    <h3>{{ theme.name }}</h3>
    <p>{{ theme.description }}</p>
    <button
      [ngClass]="{ 'subscribed': isSubscribed(theme.id) }"
      (click)="toggleSubscription(theme.id)">
      {{ isSubscribed(theme.id) ? 'Déjà abonné' : 'S’abonner' }}
    </button>
  </div>
</div>
  `,
  styleUrls: ["./themes.component.scss"],
})
export class ThemeComponent implements OnInit {
  themes: Theme[] = [];
  subscriptions: number[] = []; // IDs des thèmes auxquels l'utilisateur est abonné

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
    this.loadThemes(); // Charger tous les thèmes disponibles
    this.loadSubscriptions(); // Charger les abonnements de l'utilisateur
  }

  // Charge tous les thèmes depuis l'API
  loadThemes(): void {
    this.themeService.getAllThemes().subscribe({
      next: (data: Theme[]) => {
        this.themes = data;
      },
      error: (err) => {
        console.error("Erreur lors du chargement des thèmes :", err);
      },
    });
  }

  // Récupère les abonnements de l'utilisateur
  loadSubscriptions(): void {
    this.themeService.getUserSubscriptions().subscribe({
      next: (subs) => {
        this.subscriptions = subs.map((sub) => sub.themeId); // Extraire uniquement les IDs
      },
      error: (err) => {
        console.error("Erreur lors du chargement des abonnements :", err);
      },
    });
  }

  // Vérifie si l'utilisateur est abonné à un thème
  isSubscribed(themeId: number): boolean {
    return this.subscriptions.includes(themeId);
  }

  //  Abonne ou désabonne l'utilisateur au thème
  toggleSubscription(themeId: number): void {
    if (this.isSubscribed(themeId)) {
      // Se désabonner
      this.themeService.unsubscribeFromTheme(themeId).subscribe(() => {
        this.subscriptions = this.subscriptions.filter((id) => id !== themeId);
      });
    } else {
      // S’abonner
      this.themeService.subscribeToTheme(themeId).subscribe(() => {
        this.subscriptions.push(themeId);
      });
    }
  }
}
