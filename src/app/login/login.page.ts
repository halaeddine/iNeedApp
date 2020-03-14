import { AuthenticationService } from '../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 
 data:any = {};
loader:any = false;
  constructor(private authService: AuthenticationService, private storage: Storage) { }
 
  ngOnInit() {
   
  }
 
  loginForm() {
     this.loader = true;
    this.authService.login(this.data).then(()=>{
      this.loader = false;
    },err=>{
      this.loader = false;
    });
  }
 
}