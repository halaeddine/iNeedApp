import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router} from '@angular/router';
import { HTTP } from '@ionic-native/http/ngx';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-my-businesses',
  templateUrl: './my-businesses.page.html',
  styleUrls: ['./my-businesses.page.scss'],
})
export class MyBusinessesPage implements OnInit {

businesses:any;
public userid:string = "";
businessesdata:any;
loading:any;
  constructor(
    public navCtrl: NavController,
    public storage:Storage,
    private router: Router,
    private http: HTTP,
    public loadingController: LoadingController
    ) {

 this.storage.get('userData').then(val=>{
    this.userid = JSON.stringify(val);
    this.getBussinesses(this.userid);
   });

this.businesses = [
// {
//   		'id':1,
//   		'businessName':'Hussein Barber',
//   		'businessPhoneNumber':'70785760',
//   		'businessDesc':'abc123',
//   		'businessViews':'30'
//   	},
//   	{	'id':2,
//   		'businessName':'Bilal Barber',
//   		'businessPhoneNumber':'70785760',
//   		'businessDesc':'abc1234',
//   		'businessViews':'10'
//   	}
    ];

   }

  ngOnInit() {
  }

  goToBusinessDetails(id){
this.navCtrl.navigateForward('businessdetails/'+ id);
}

getBussinesses(id){
  this.presentLoading();
     return new Promise((resolve, reject)=>{
        this.http.get('http://www.brands-tech.com/api/getuserdata',{userId:id},{})
        .then(data => {
          this.businessesdata = JSON.parse(data.data);
          this.businesses = this.businessesdata.businesses;
          this.dismissLoading();
           resolve(true);
          }).catch(err=>{
          reject(err);
          this.dismissLoading();
        });
      });
 }

 presentLoading() {
 this.loading =  this.loadingController.create({
      message: 'Please wait...',
      // duration: 2000
    }).then(res=>{
      res.present();
      res.onDidDismiss();
    });
  }
  dismissLoading(){
       setTimeout(()=>{
              this.loadingController.dismiss();
          },1000)
  }

}
