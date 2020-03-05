import { Platform, NavController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
 import { HttpClient  } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

const TOKEN_KEY = 'auth-token';
 
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
 
  authenticationState = new BehaviorSubject(false);
 //a
  constructor(
   private storage: Storage,
   private plt: Platform,
   private http: HttpClient,
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
        return  this.isAuthenticated();
      }
    });

  }
 
 login(_data) {
     return new Promise((resolve, reject)=>{
      this.http.post('http://www.brands-tech.com/api/login',_data,{})
      .subscribe(data => {
        console.log(data);
       switch(data.result.result){
         case 0:
         this.Toast(data.desc);
           console.log(data.result.desc);
         break;
         case 1:
         this.Toast(data.desc);
           console.log(data.result.desc);
         break;
         case 2:
         this.Toast(data.result.desc);
         this.storage.set(TOKEN_KEY, data.session._token).then(() => {
            this.authenticationState.next(true);
         });
         this.router.navigateByUrl('/dashboard');
           console.log(data.result.desc);
         break;
       }
      }, (err)=>{
        reject(err);
        console.log(err);
      });
  });
  }
 
  logout() {
 return new Promise((resolve, reject)=>{
      this.http.get('http://www.brands-tech.com/api/logout',{})
      .subscribe(data => {
       console.log(data);
      this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
      // this.router.navigateByUrl('/login');

    });
      }, (err)=>{
        reject(err);
        console.log(err);
      });
  });
  }
 
  isAuthenticated() {
    console.log(this.authenticationState.value);
    // if(!this.authenticationState.value){
    //   this.router.navigateByUrl('/login');
    // }
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