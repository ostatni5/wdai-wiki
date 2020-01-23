import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.warn("GUARD ADMIN", this.auth.currentUser())
    return new Promise<boolean>((resolve) => {
      let sub = this.auth.userData.subscribe((userData) => {
        let email = userData ? userData.email : null
        let guid = userData ? userData.uid : null
        console.log(email)
        if (email == "admin@wdai.pl") resolve(true);
        else
        {
          this.router.navigate(['/login']);
          resolve(false);
        }
        sub.unsubscribe()
      })
    })

  }

}
