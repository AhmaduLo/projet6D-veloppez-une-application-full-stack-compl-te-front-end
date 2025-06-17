import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserRegister } from 'src/app/models/UserRegister';
import { me } from 'src/app/models/me';
import { UserUpdate } from 'src/app/models/UserUpdate';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  private loggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  constructor(private http: HttpClient) { }


  register(user: UserRegister): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/register`, user);
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  getCurrentUser(): Observable<me> {
  return this.http.get<me>(`${this.apiUrl}/me`);
}

updateUser(data: UserUpdate): Observable<{ message: string }> {
  const headers = this.getAuthHeaders();
  return this.http.put<{ message: string }>(`${this.apiUrl}/update/me`, data, { headers });
}

private getAuthHeaders(): HttpHeaders {
  const token = localStorage.getItem('token');
  return new HttpHeaders({
    Authorization: `Bearer ${token}`
  });
}

  // Vérifie s'il y a un token
  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  // Observable pour les composants
  isLoggedIn$(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }

  // À appeler après login/logout
  setLoggedIn(status: boolean): void {
    this.loggedInSubject.next(status);
  }
  logout(): void {
    localStorage.removeItem('token');
    this.setLoggedIn(false);
  }
}
