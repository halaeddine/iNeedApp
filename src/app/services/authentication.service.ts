import { Platform, NavController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
// import { HttpClient  } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage';
import { HTTP } from '@ionic-native/http/ngx';

const TOKEN_KEY = 'auth-token';
const userData = 'userData';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  data:any;
  businessdetails:any;
  businesses:any;
  categories:any;
  userdata:any;
  userId:any;
  updatedImage:any;
  authenticationState = new BehaviorSubject(false);

  constructor(
   private storage: Storage,
   private plt: Platform,
   private http: HTTP,

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
 getBusinessDetails(id){
       return new Promise((resolve, reject)=>{
        this.http.get('http://www.brands-tech.com/api/getbusinessdetails',id,{})
        .then(data => {
          this.businessdetails = JSON.stringify(data.data);
         
        }).catch(err=>{
          reject(err);
        });
      });
 }
 



 getUserData(id){
     return new Promise((resolve, reject)=>{
        this.http.post('http://www.brands-tech.com/api/getuserdata',{userId:id},{})
        .then(data => {
          this.userdata = JSON.parse(data.data);
          resolve(true)
          }).catch(err=>{
          reject(false);
        });
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
         console.log(data);
         this.storage.set(TOKEN_KEY, this.data.session._token).then(() => {
              this.storage.set("userId", JSON.parse(this.data.session.userId)).then(() => {
                this.storage.set("userData", JSON.stringify(this.data.userData)).then(() => {
                 this.authenticationState.next(true);
                 this.router.navigateByUrl('/dashboard');
               });
           });
         });
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
        this.storage.remove(userData).then(() => {
          this.authenticationState.next(false);
          this.router.navigateByUrl('/dashboard');        
    });
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