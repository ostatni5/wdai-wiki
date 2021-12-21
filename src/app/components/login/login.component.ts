import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	loginForm = new FormGroup({
		email: new FormControl(null, [Validators.required, Validators.email]),
		password: new FormControl(null, [Validators.required])
	});

	constructor(private auth: AuthService) {}

	ngOnInit() {}

	onSubmit() {
		let form = this.loginForm.value;
		this.auth.signInWithEmailAndPassword(form.email, form.password);
	}
}
