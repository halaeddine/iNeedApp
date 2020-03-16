import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
// import { AuthenticationService } from '../services/authentication.service';
import { Storage } from '@ionic/storage';
import { HTTP } from '@ionic-native/http/ngx';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-businesses',
  templateUrl: './businesses.page.html',
  styleUrls: ['./businesses.page.scss'],
})
export class BusinessesPage implements OnInit {

businesses:any;
// _get:any;
catId:any;
loading:any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HTTP,
    private storage:Storage,
    public loadingController: LoadingController) { 
  	 this.businesses = [];
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.queryParams) {
        this.catId = this.router.getCurrentNavigation().extras.queryParams.id;
        this.getBusinessesWithCatId(this.catId);
      }
    });
   
  }

  ngOnInit() {}

getBusinessesWithCatId(id){
  this.presentLoading();
   return new Promise((resolve, reject)=>{
        this.http.get('http://www.brands-tech.com/api/getbusinesseswithsamecategory',{catId:id},{})
        .then(data => {
          this.businesses = JSON.parse(data.data);
          this.dismissLoading();
          resolve(true);
        }).catch(err=>{
          reject(err);
          this.dismissLoading();
        });
      });
}
goToBusinessDetails(id){

  this.businesses.forEach((val,key)=>{
    if(val.businessId == id){
      this.storage.set('businessDetailsSelected', JSON.stringify(val));
    }
  })
this.router.navigate(['businessdetails']);
}

 presentLoading() {
 this.loading =  this.loadingController.create({
      message: 'Please wait...',
      duration: 2000
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
