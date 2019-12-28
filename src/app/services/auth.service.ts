import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  email: string;
  userData: Observable<firebase.User>;
  constructor(private angularFireAuth: AngularFireAuth, private router: Router) {
    this.userData = angularFireAuth.authState;
    this.userData.subscribe((userData) => {
     this.email = userData ? userData.email : null
    })
  }
  currentUser() {
    return this.email;
  }
  signInWithEmailAndPassword(email, password) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        window.alert("Logged")
        localStorage.setItem('user', JSON.stringify(result));
        console.log(result);
        this.router.navigate(['/dashboard']);
      })
      .catch((error) => { alert(error.message); });
  }
  createUserWithEmailAndPassword(email, password) {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => { window.alert("Registered"); console.log(result); })
      .catch((error) => { window.alert(error.message) })
  }
  signOut() {
    return this.angularFireAuth.auth.signOut()
      .then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
      })
  }
}
