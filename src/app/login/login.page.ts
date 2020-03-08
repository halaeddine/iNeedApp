import { AuthenticationService } from '../services/authentication.service';
import { Component, OnInit } from '@angular/core';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 
 data:any = {};
loader:any = false;
  constructor(private authService: AuthenticationService) { }
 
  ngOnInit() {
   
  }
 
  loginForm() {
     this.loader = true;
  	// console.log(this.data);
    this.authService.login(this.data).then(()=>{
      this.loader = false;
    },err=>{
      this.loader = false;
    });
  }
 
}