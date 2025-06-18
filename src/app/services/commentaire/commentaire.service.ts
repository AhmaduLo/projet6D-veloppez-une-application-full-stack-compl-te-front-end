import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Article } from "src/app/models/Article";
import { Commentaire } from "src/app/models/Commentaire";

@Injectable({
  providedIn: "root",
})
export class CommentaireService {
  private apiUrl = "http://localhost:8080/api/comments";

  constructor(private http: HttpClient) {}

  //  Récupère le token depuis le localStorage
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem("token");
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  //  Récupérer tous les articles
  getAllArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.apiUrl);
  }

  //  Ajouter un commentaire
  addComment(comment: {
    content: string;
    articleId: number;
  }): Observable<Commentaire> {
    return this.http.post<Commentaire>(`${this.apiUrl}`, comment, {
      headers: this.getAuthHeaders(),
    });
  }

  //  Récupérer les commentaires d’un article
  getCommentsByArticleId(articleId: number): Observable<Commentaire[]> {
    return this.http.get<Commentaire[]>(`${this.apiUrl}/article/${articleId}`);
  }

  //  Supprimer un commentaire (si besoin)
  deleteComment(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }
}
