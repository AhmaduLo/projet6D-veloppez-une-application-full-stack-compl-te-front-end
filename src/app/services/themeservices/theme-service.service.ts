import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Theme } from 'src/app/models/theme.model';
import { Subscription } from 'src/app/models/subscription.model';


@Injectable({
  providedIn: 'root' //Rend le service disponible dans toute l'application
})
export class ThemeService {
  private apiUrl = 'http://localhost:8080/api';

  // Injection de HttpClient pour faire des requêtes
  constructor(private http: HttpClient) { }


  //  Récupérer tous les thèmes
  getAllThemes(): Observable<Theme[]> {
    return this.http.get<Theme[]>(`${this.apiUrl}/themes`);
  }

  // S'abonner à un thème
  subscribeToTheme(themeId: number): Observable<Subscription> {
    const headers = this.getAuthHeaders();
    return this.http.post<Subscription>(`${this.apiUrl}/subscriptions/${themeId}`, {}, { headers });
  }

  // Se désabonner d’un thème
  unsubscribeFromTheme(themeId: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/subscriptions/${themeId}`, { headers });
  }

  // Récupérer mes abonnements
  getUserSubscriptions(): Observable<Subscription[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Subscription[]>(`${this.apiUrl}/subscriptions`, { headers });
  }

  //  Ajouter l'en-tête Authorization avec le token
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }
}
