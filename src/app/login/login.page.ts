import { AuthenticationService } from '../services/authentication.service';
import { Component, OnInit } from '@angular/core';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 
 data:any = {};

  constructor(private authService: AuthenticationService) { }
 
  ngOnInit() {
  }
 
  loginForm() {
  	// console.log(this.data);
    this.authService.login(this.data);
  }
 
}