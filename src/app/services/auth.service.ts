import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private url = environment.serverUrl;
	email: string;
	guid: string;
	token: string;
	userData: Observable<firebase.User>;
	constructor(
		private http: HttpClient,
		private angularFireAuth: AngularFireAuth,
		private router: Router
	) {
		this.userData = angularFireAuth.authState;
		this.userData.subscribe(userData => {
			this.email = userData ? userData.email : null;
			this.guid = userData ? userData.uid : null;
		});
	}
	currentUser() {
		return this.email;
	}
	currentGuid() {
		return this.guid;
	}
	currentToken() {
		return this.token || JSON.parse(localStorage.getItem('token'));
	}
	signInWithEmailAndPassword(email, password) {
		return this.angularFireAuth.auth
			.signInWithEmailAndPassword(email, password)
			.then(result => this.loggedUser(result))
			.catch(error => {
				alert(error.message);
			});
	}
	createUserWithEmailAndPassword(email, password) {
		return this.angularFireAuth.auth
			.createUserWithEmailAndPassword(email, password)
			.then(result => {
				window.alert('Registered');
				this.loggedUser(result);
			})
			.catch(error => {
				window.alert(error.message);
			});
	}
	signOut() {
		return this.angularFireAuth.auth.signOut().then(() => {
			this.email = null;
			this.guid = null;
			this.token = null;
			localStorage.removeItem('user');
			localStorage.removeItem('token');
			this.router.navigate(['/login']);
		});
	}
	async getToken() {
		this.token = await this.angularFireAuth.auth.currentUser.getIdToken(true);
		localStorage.setItem('token', JSON.stringify(this.token));
		this.router.navigate(['/dashboard']);
		return this.token;
	}
	loggedUser(result) {
		window.alert('Logged');
		localStorage.setItem('user', JSON.stringify(result));
		console.log(result);
		this.getToken();
	}
}
