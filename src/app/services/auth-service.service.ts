import { Injectable } from '@angular/core';
import { UserRegister } from '../models/UserRegister';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
