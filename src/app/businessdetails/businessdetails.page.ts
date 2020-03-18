import { Component, OnInit,ViewChild,ElementRef,AfterViewInit } from '@angular/core';
// import { Router, NavigationExtras } from '@angular/router';
// import { ActivatedRoute } from '@angular/router';
import { LocationService } from '../services/location.service';
import { Storage } from '@ionic/storage';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { SMS } from '@ionic-native/sms/ngx';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  LatLng,
  CameraPosition,
  GoogleMapsAnimation,
  MarkerOptions,
  Marker,
  Environment,
  MyLocation
} from '@ionic-native/google-maps';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
declare var google;
@Component({
  selector: 'app-businessdetails',
  templateUrl: './businessdetails.page.html',
  styleUrls: ['./businessdetails.page.scss'],
})
export class BusinessdetailsPage implements OnInit {
  // @ViewChild('map',{static: true}) element;
 @ViewChild('mapElement',{static: true}) mapNativeElement: ElementRef;
map: GoogleMaps;
details:any;
name:any;
phoneNumber:any;
desc:any;
views:any;
catEn:any;
catAr:any;
images:any;
place:any;
  constructor(
    // private route: ActivatedRoute,
    // private router: Router,
    public googleMaps: GoogleMaps,
    private storage: Storage,
    private callnumber:CallNumber,
    private nativeGeocoder: NativeGeocoder,
    private location: LocationService,
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
   
     
     setTimeout(()=>{
       console.log(this.location.lat);
       console.log(this.location.lng);
     },500);
     
  }
ngAfterViewInit(){
    this.geoCoder(this.location.lat,this.location.lng);
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

call(){
  this.callnumber.callNumber(this.phoneNumber, true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));
}

sms(){
  // this.smsnumber.send(this.phoneNumber, 'Hello world!');
}


  ngOnInit() {}


}