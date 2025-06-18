import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/Article';
import { ArticleService } from 'src/app/services/articlesApi/article-service.service';

@Component({
  selector: 'app-article',
  template: `
   <div class="article-container">
  <div class="header-actions">
    <button class="create-btn"  [routerLink]="['/newArticle']">Créer un article</button>
    <div class="sort" (click)="toggleSortOrder()">
      Trier par {{ sortOrder === 'desc' ? '↓' : '↑' }}
    </div>
  </div>

  <div class="grid">
    <div class="card" *ngFor="let article of articles" [routerLink]="['/article', article.id]">
      <h3>{{ article.title }}</h3>
      <div class="meta">
        <span class="sate">{{ article.createdAt | date:'shortDate' }}</span>
        <span class="auteur">{{ article.authorUsername }}</span>
      </div>
      <p>{{ article.content }}</p>
    </div>
  </div>
</div>
 <div class="error-message" *ngIf="errorMessage">
  {{ errorMessage }}
</div>
  `,
  styleUrls: ['./article.component.scss']
})
export class ArticlesComponent implements OnInit {
  articles: Article[] = [];
  errorMessage: string = '';
  sortOrder: 'asc' | 'desc' = 'desc';

  constructor(private articleService: ArticleService) { }


  ngOnInit(): void {
    this.articleService.getAllArticles().subscribe({
      next: (data) => {
        this.articles = data;
      },
      error: (err) => {
        this.errorMessage = 'Erreur de chargement des articles.';
        //console.error('Erreur de chargement des articles :', err);
      }
    });
  }

  toggleSortOrder(): void {
    this.sortOrder = this.sortOrder === 'desc' ? 'asc' : 'desc';
    this.articles = this.sortArticles(this.articles);
  }
  sortArticles(articles: Article[]): Article[] {
    return articles.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return this.sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });
  }
}
