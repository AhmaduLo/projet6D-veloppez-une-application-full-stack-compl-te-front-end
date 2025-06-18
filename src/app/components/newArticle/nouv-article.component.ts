import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Theme } from "src/app/models/theme.model";
import { ArticleService } from "src/app/services/articlesApi/article-service.service";
import { ThemeService } from "src/app/services/themeservices/theme-service.service";

@Component({
  selector: "app-nouv-article",
  template: `
    <div class="new-article-container">
      <button class="back-btn" routerLink="/article">←</button>
      <h2>Créer un nouvel article</h2>

      <form [formGroup]="articleForm" (ngSubmit)="onSubmit()">
        <select formControlName="themeId">
          <option value="" disabled selected>Sélectionner un thème</option>
          <option *ngFor="let theme of subscribedThemes" [value]="theme.id">
            {{ theme.name }}
          </option>
        </select>

        <input
          type="text"
          formControlName="title"
          placeholder="Titre de l'article"
        />
        <textarea
          formControlName="content"
          placeholder="Contenu de l’article"
        ></textarea>

        <button type="submit" [disabled]="articleForm.invalid">Créer</button>
      </form>
    </div>
  `,
  styleUrls: ["./nouv-article.component.scss"],
})
export class NouvArticleComponent implements OnInit {
  articleForm!: FormGroup;
  subscribedThemes: Theme[] = [];

  constructor(
    private fb: FormBuilder,
    private themeService: ThemeService,
    private articleService: ArticleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialiser le formulaire
    this.articleForm = this.fb.group({
      themeId: ["", Validators.required],
      title: ["", Validators.required],
      content: ["", Validators.required],
    });

    // Charger uniquement les thèmes abonnés
    this.themeService.getUserSubscriptions().subscribe({
      next: (subs) => {
        const themeIds = subs.map((s) => s.themeId);
        this.themeService.getAllThemes().subscribe((allThemes) => {
          this.subscribedThemes = allThemes.filter((t) =>
            themeIds.includes(t.id)
          );
        });
      },
      error: (_) => console.error("Erreur chargement abonnements"),
    });
  }

  onSubmit(): void {
    if (this.articleForm.invalid) return;

    const formData = this.articleForm.value;

    this.articleService.createArticle(formData).subscribe({
      next: (_) => this.router.navigate(["/article"]),
      error: (err) => console.error("Erreur création article", err),
    });
  }
}
