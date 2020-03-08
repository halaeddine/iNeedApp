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

  data:any;
  authenticationState = new BehaviorSubject(false);

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
        // this.authenticationState.next(true);
        // return  this.isAuthenticated();
      
        return true;
      }else{
        console.log('false');
        
        return false;
      }
    });

  }
 
 login(_data) {
     return new Promise((resolve, reject)=>{
      this.http.post('http://www.brands-tech.com/api/login',_data,{})
      .subscribe(data => {
        this.data = data;
        console.log(data);
       switch(this.data.result.result){
         case 0:
         this.Toast(this.data.desc);
           // console.log(data.result.desc);
         break;
         case 1:
         this.Toast(this.data.desc);
           // console.log(data.result.desc);
         break;
         case 2:
         this.Toast(this.data.result.desc);
         this.storage.set(TOKEN_KEY, this.data.session._token).then(() => {
            this.authenticationState.next(true);
            // this.checkToken();
         });
         this.router.navigateByUrl('/dashboard');

           // console.log(data.result.desc);
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
          // this.checkToken();
        
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