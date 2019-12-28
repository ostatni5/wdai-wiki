import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    email: new FormControl(null,[Validators.required,Validators.email]),
    password: new FormControl(null,[Validators.required,Validators.minLength(6)]),
      });

  constructor(private auth:AuthService) { }

  ngOnInit() {
  }

  onSubmit() {
    let form =this.registerForm.value;   
    this.auth.createUserWithEmailAndPassword(form.email,form.password);
  }
}
