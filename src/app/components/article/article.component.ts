import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/Article';
import { ArticleService } from 'src/app/services/articlesApi/article-service.service';

@Component({
  selector: 'app-article',
  template: `
   <div class="article-container">
  <div class="header-actions">
    <button class="create-btn">Créer un article</button>
    <div class="sort">Trier par <span>↓</span></div>
  </div>

  <div class="grid">
    <div class="card" *ngFor="let article of articles">
      <h3>{{ article.title }}</h3>
      <div class="meta">
        <span class="sate">{{ article.createdAt | date:'shortDate' }}</span>
        <span class="auteur">{{ article.authorUsername }}</span>
      </div>
      <p>Content: {{ article.content }}</p>
    </div>
  </div>
</div>
  `,
  styleUrls: ['./article.component.scss']
})
export class ArticlesComponent implements OnInit {
   articles: Article[] = [];
   
  constructor(private articleService: ArticleService) { }
 

  ngOnInit(): void {
    this.articleService.getAllArticles().subscribe({
      next: (data) => {
        this.articles = data;
      },
      error: (err) => {
        console.error('Erreur de chargement des articles :', err);
      }
    });
  }

}
