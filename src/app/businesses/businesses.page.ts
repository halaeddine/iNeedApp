import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { LocationService } from '../services/location.service';
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
address:any='';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HTTP,
    private storage:Storage,
    private location: LocationService,
    private nativeGeocoder: NativeGeocoder,
    public loadingController: LoadingController) { 
  	 this.businesses = [];
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.queryParams) {
        this.catId = this.router.getCurrentNavigation().extras.queryParams.id;
        
      }
    });
   
  }

  ngOnInit() {}
ngAfterViewInit(){
  setTimeout(()=>{
         this.geoCoder(this.location.lat,this.location.lng);
     },500);
  
  }
getBusinessesWithCatId(id,address){
  this.presentLoading();
   return new Promise((resolve, reject)=>{
        this.http.get('http://www.brands-tech.com/api/getbusinesseswithsamecategory',{catId:id,address:address},{})
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

geoCoder(lat,lng){
      let options: NativeGeocoderOptions = {
        useLocale: false,
        maxResults: 5
      };
    this.nativeGeocoder.reverseGeocode(lat,lng, options)
      .then((result: NativeGeocoderResult[]) =>{
        this.address = this.locationFilter(result);
        this.getBusinessesWithCatId(this.catId,this.address);
      })
      .catch((error: any) => console.log(error));
}

locationFilter(result){
  var _locality;
  result.forEach((val,key)=>{
    if(val.locality !== 'Unnamed Road' && val.locality.length > 0){
      _locality = val.locality;
    }
  })
  return _locality;
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
