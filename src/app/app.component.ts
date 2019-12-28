import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'wdai-wiki';
  email = null;

  private sub: any;

  constructor(private auth: AuthService, private router: Router) {

  }
  ngOnInit(): void {
    this.sub = this.auth.userData.subscribe(userData => {      
      this.email = userData ? userData.email : null;
      console.log(this.email);
    });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  signOut() {
    this.auth.signOut();
    this.router.navigate(['']);
  }
}
