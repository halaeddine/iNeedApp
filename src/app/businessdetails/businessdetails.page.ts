import { Component, OnInit } from '@angular/core';
// import { Router, NavigationExtras } from '@angular/router';
// import { ActivatedRoute } from '@angular/router';
// import { AuthenticationService } from '../services/authentication.service';
import { Storage } from '@ionic/storage';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { SMS } from '@ionic-native/sms/ngx';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

@Component({
  selector: 'app-businessdetails',
  templateUrl: './businessdetails.page.html',
  styleUrls: ['./businessdetails.page.scss'],
})
export class BusinessdetailsPage implements OnInit {
map: GoogleMap;

details:any;
name:any;
phoneNumber:any;
desc:any;
views:any;
catEn:any;
catAr:any;
images:any;
  constructor(
    // private route: ActivatedRoute,
    // private router: Router,
    private storage: Storage,
    private callnumber:CallNumber,
    private nativeGeocoder: NativeGeocoder,
    // private smsnumber: SMS
    ) {
     this.storage.get('businessDetailsSelected').then(val=>{
       this.details = JSON.parse(val);
       this.name = this.details.businessName;
       this.phoneNumber = this.details.businessPhoneNumber;
       this.desc = this.details.businessDesc;
       this.views = this.details.businessViews;
       this.catEn = this.details.category.catNameEn;
       this.catAr = this.details.category.catNameAr;
       this.images = this.details.images;
       console.log(this.details);
     });
     this.loadMap();
     this.geoCoder();
  }

geoCoder(){
  let options: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
};

this.nativeGeocoder.reverseGeocode(33.8412852, 35.5145277, options)
  .then((result: NativeGeocoderResult[]) => alert(JSON.stringify(result[0])))
  .catch((error: any) => console.log(error));
}

call(){
  this.callnumber.callNumber(this.phoneNumber, true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));
}

sms(){
  // this.smsnumber.send(this.phoneNumber, 'Hello world!');
}

loadMap(){
  let mapOptions: GoogleMapOptions = {
      camera: {
         target: {
           lat: 43.0741904,
           lng: -89.3809802
         },
         zoom: 18,
         tilt: 30
       }
    };
    this.map = GoogleMaps.create('map_canvas', mapOptions);

}
  ngOnInit() {}


}