import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Theme } from "src/app/models/theme.model";
import { AuthService } from "src/app/services/auth/auth-service.service";
import { ThemeService } from "src/app/services/themeservices/theme-service.service";

@Component({
  selector: "app-profil",
  template: `
    <h2>Profil utilisateur</h2>

    <form [formGroup]="profilForm" (ngSubmit)="onSubmit()">
      <input formControlName="username" placeholder="Nom d'utilisateur" />
      <input formControlName="email" type="email" placeholder="Email" />
      <input
        formControlName="password"
        type="password"
        placeholder="Mot de passe (laisser vide si inchangé)"
      />
      <button type="submit" [disabled]="profilForm.invalid">Sauvegarder</button>
    </form>

    <div *ngIf="successMessage" class="success">{{ successMessage }}</div>
    <div *ngIf="errorMessage" class="error">{{ errorMessage }}</div>

    <hr />

    <h3>Abonnements</h3>
    <div class="contain-subscr">
      <div *ngFor="let theme of subscriptions" class="theme-card">
        <h4>{{ theme.name }}</h4>
        <p>{{ theme.description }}</p>
        <div class="button-unsubscribe">
          <button (click)="unsubscribe(theme.id)">Se désabonner</button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ["./profil.component.scss"],
})
export class ProfilComponent implements OnInit {
  profilForm!: FormGroup; // Déclaration du formulaire de profil utilisateur
  subscriptions: Theme[] = []; // Liste des thèmes auxquels l'utilisateur est abonné
  successMessage: string = "";
  errorMessage: string = "";

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    // Initialisation du formulaire
    this.profilForm = this.fb.group({
      username: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: [""],
    });

    // Chargement des données de l'utilisateur et de ses abonnements à l'initialisation
    this.loadUserData();
    this.loadSubscriptions();
  }

  // Récupère les informations du profil utilisateur depuis le backend
  loadUserData() {
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        // Met à jour les valeurs du formulaire avec les données récupérées
        this.profilForm.patchValue({
          username: user.username,
          email: user.email,
        });
      },
      error: (err) => {
        this.errorMessage = "Impossible de charger vos données.";
      },
    });
  }

  // Charge les abonnements de l'utilisateur
  loadSubscriptions() {
    this.themeService.getUserSubscriptions().subscribe({
      next: (subs) => {
        // Récupère uniquement les IDs des thèmes auxquels l'utilisateur est abonné
        const themeIds = subs.map((s) => s.themeId);

        // Récupère tous les thèmes puis filtre ceux auxquels l'utilisateur est abonné
        this.themeService.getAllThemes().subscribe((allThemes) => {
          this.subscriptions = allThemes.filter((t) => themeIds.includes(t.id));
        });
      },
      error: (_) => console.error("Erreur chargement abonnements"),
    });
  }

  onSubmit() {
    if (this.profilForm.invalid) return;

    const formData = this.profilForm.value;
    console.log("Données envoyées :", formData);

    // Envoie les données au backend pour mise à jour
    this.authService.updateUser(formData).subscribe({
      next: (res) => {
        this.successMessage = res.message;
        setTimeout(() => (this.successMessage = ""), 5000);
      },
      error: (err) => {
        this.errorMessage =
          typeof err.error === "string" ? err.error : "Erreur inconnue";
      },
    });
  }

  // Méthode permettant de se désabonner d’un thème
  unsubscribe(themeId: number) {
    this.themeService.unsubscribeFromTheme(themeId).subscribe({
      next: () =>
        // Met à jour localement la liste des abonnements sans le thème supprimé
        (this.subscriptions = this.subscriptions.filter(
          (t) => t.id !== themeId
        )),
      error: (_) => alert("Erreur lors du désabonnement"),
    });
  }
}
