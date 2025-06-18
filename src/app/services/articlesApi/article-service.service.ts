import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from 'src/app/models/Article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
private apiUrl = 'http://localhost:8080/api/articles';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
      const token = localStorage.getItem("token");
      return new HttpHeaders({ Authorization: `Bearer ${token}` });
    }
  

  getAllArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.apiUrl);
  }

  //  Récupérer un article par ID
  getArticleById(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}/${id}`);
  }

  createArticle(data: { title: string; content: string; themeId: number }): Observable<any> {
  const headers = this.getAuthHeaders(); // avec Bearer token
  return this.http.post(`${this.apiUrl}`, data, { headers });
}
}
