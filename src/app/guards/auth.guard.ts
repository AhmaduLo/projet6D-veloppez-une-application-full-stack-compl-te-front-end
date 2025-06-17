import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  authService: any;
  router: any;
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    // Vérifie la présence d'un token dans le localStorage (ou autre méthode via AuthService)
    if (this.authService.isLoggedIn()) {
      return true; // autorise l'accès
    }

    // Sinon, redirige vers la page de login
    return this.router.createUrlTree(['/login']);
  }
}


