import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Article } from "src/app/models/Article";
import { Commentaire } from "src/app/models/Commentaire";
import { ArticleService } from "src/app/services/articlesApi/article-service.service";
import { CommentaireService } from "src/app/services/commentaire/commentaire.service";

@Component({
  selector: "app-commentaire",
  template: `
    <div class="comment-container" *ngIf="article">
      <div class="contait-btn-title">
       <button class="back-btn" routerLink="/article">←</button>
      <h2>{{ article.title }}</h2>
      </div>
      <div class="meta-info">
        <span> {{ article.createdAt | date }}</span>
        <span> {{ article.authorUsername }}</span>
        <span> {{ article.themeName }}</span>
      </div>

      <p class="full-content">{{ article.content }}</p>

      <hr />

      <h3>Commentaires</h3>

      <div *ngFor="let c of comments" class="contait-comment" >
      
        <div class="author">  <p>{{ c.authorUsername }}</p></div>

        <div class="comment-box">{{ c.content }}</div>
      </div>

      <form class="comment-form" (ngSubmit)="submitComment()">
        <textarea
          placeholder="Écrivez ici votre commentaire"
          [(ngModel)]="newComment"
          name="newComment"
          required
        ></textarea>
        <button type="submit" class="send-btn">
          <img src="/assets/envoyer.png" alt="Envoyer" />
        </button>
      </form>
    </div>
  `,
  styleUrls: ["./commentaire.component.scss"],
})
export class CommentaireComponent implements OnInit {
  articleId!: number;
  article!: Article;
  comments: Commentaire[] = [];
  newComment = "";

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private commentaireService: CommentaireService
  ) { }

  ngOnInit(): void {
    this.articleId = Number(this.route.snapshot.paramMap.get("id")); // Récupère l'ID de l'article à partir de l'URL
    this.loadArticle();
    this.loadComments();
  }

  // Récupère les détails de l'article via l'API
  loadArticle(): void {
    this.articleService.getArticleById(this.articleId).subscribe({
      next: (data) => (this.article = data),
    });
  }

  // Récupère les commentaires associés à l'article
  loadComments(): void {
    this.commentaireService.getCommentsByArticleId(this.articleId).subscribe({
      next: (data) => (this.comments = data),
    });
  }

  // Envoie un nouveau commentaire à l'API
  submitComment(): void {
    if (!this.newComment.trim()) return;
    this.commentaireService
      .addComment({
        content: this.newComment,
        articleId: this.articleId,
      })
      .subscribe(() => {
        this.newComment = "";
        this.loadComments();// Recharge les commentaires pour afficher le nouveau
      });
  }
}
