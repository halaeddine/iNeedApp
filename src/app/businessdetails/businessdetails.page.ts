import { Component, OnInit,ViewChild,ElementRef,AfterViewInit } from '@angular/core';
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
  constructor(
    // private route: ActivatedRoute,
    // private router: Router,
    public googleMaps: GoogleMaps,
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
     // this.loadMap();
     // this.geoCoder();
  }
ngAfterViewInit(): void {
    const map = new google.maps.Map(this.mapNativeElement.nativeElement, {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });
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
  // let map: GoogleMap = this.googleMaps.create(this.element.nativeElement);

  //   map.one(GoogleMapsEvent.MAP_READY).then((data: any) => {
  //     let coordinates: LatLng = new LatLng(33.6396965, -84.4304574);
  //     let position = {
  //       target: coordinates,
  //       zoom: 17
  //     };
  //     map.animateCamera(position);
  //     let markerOptions: MarkerOptions = {
  //       position: coordinates,
  //       icon: "assets/images/icons8-Marker-64.png",
  //       title: 'Our first POI'
  //     };
  //     const marker = map.addMarker(markerOptions)
  //       .then((marker: Marker) => {
  //         marker.showInfoWindow();
  //     });
  //   })

// this.map = GoogleMaps.create('map_canvas', {
//       camera: {
//         target: {
//           lat: 43.0741704,
//           lng: -89.3809802
//         },
//         zoom: 18,
//         tilt: 30
//       }
//     });
 // this.map.getMyLocation().then((location: MyLocation) => {
 //      // this.loading.dismiss();
 //      console.log(JSON.stringify(location, null ,2));

 //      // Move the map camera to the location with animation
 //      this.map.animateCamera({
 //        target: location.latLng,
 //        zoom: 17,
 //        tilt: 30
 //      });
 //    });
}

  ngOnInit() {}


}