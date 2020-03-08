import { Platform, NavController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
 import { HttpClient  } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  data:any;
  data1:any;
  authenticationState = new BehaviorSubject(false);

  constructor(
   private storage: Storage,
   private plt: Platform,
   private http: HTTP,
   // private http: HttpClient,
   public toastController: ToastController,
   private router: Router) { 
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }
 
  checkToken() {
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        console.log("Token: "+res);
        this.authenticationState.next(true);
        return true;
      }else{
        console.log('false');
         this.authenticationState.next(false);
        return false;
      }
    });

  }
 
 login(_data) {

     return new Promise((resolve, reject)=>{
      this.http.post('http://www.brands-tech.com/api/login',_data,{})
      .then(data => {
        this.data = JSON.parse(data.data);
       switch(this.data.result){
         case 0:
         case 1:
         this.Toast(this.data.desc);
         break;
         case 2:
         this.Toast(this.data.desc);
         this.storage.set(TOKEN_KEY, this.data.session._token).then(() => {
            this.authenticationState.next(true);
         });
         this.router.navigateByUrl('/dashboard');
         break;
       }
      }).catch(err=>{
        reject(err);
      });
  });
  }
 
  logout() {
 return new Promise((resolve, reject)=>{
      this.http.get('http://www.brands-tech.com/api/logout',{},{})
      .then(data => {
       console.log(data);
      this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);        
    });
      }, (err)=>{
        reject(err);
        console.log(err);
      });
  });
  }
 
  isAuthenticated() {
    console.log(this.authenticationState.value);
    return this.authenticationState.value;
}
 



 async Toast(data) {
    const toast = await this.toastController.create({
      message: data,
      duration: 4000
    });
    toast.present();
  }
}