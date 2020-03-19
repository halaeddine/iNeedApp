import { Component, OnInit,AfterViewInit } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { LocationService } from '../services/location.service';
import { LoadingController } from '@ionic/angular';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-add-business',
  templateUrl: './add-business.page.html',
  styleUrls: ['./add-business.page.scss'],
})
export class AddBusinessPage implements OnInit {
categories:any;
loading:any;
place:any;
data:any = {
	businessName: null,
	businessPhoneNumber: null,
	businessDesc: null,
	catId: null,
	businessLat: null,
	businessLng: null,
	userId: null
};
  constructor(
  	private http: HTTP,
  	public loadingController: LoadingController,
  	private location: LocationService,
  	private nativeGeocoder: NativeGeocoder,
    private storage: Storage,
  	)
{	 
	this.getAllCategories();
	this.storage.get('userId').then(val=>{
        this.data.userId = val;
      });
  }

  ngOnInit() {
  }
addBusiness(){
	console.log(this.data);
}


ngAfterViewInit(){
	setTimeout(()=>{
       this.data.businessLat = this.location.lat;
       this.data.businessLng = this.location.lng;
         this.geoCoder(this.location.lat,this.location.lng);
     },500);
  
  }
geoCoder(lat,lng){
      let options: NativeGeocoderOptions = {
        useLocale: false,
        maxResults: 5
      };
    this.nativeGeocoder.reverseGeocode(lat,lng, options)
      .then((result: NativeGeocoderResult[]) =>{
        this.place = this.locationFilter(result);
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






getAllCategories(){
  this.presentLoading();
       return new Promise((resolve, reject)=>{
        this.http.get('http://www.brands-tech.com/api/getallcategories',{},{})
        .then(data => {
          this.categories = JSON.parse(data.data);
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
