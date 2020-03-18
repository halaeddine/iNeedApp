import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
public lat:any;
public lng:any;
  constructor(public geolocation: Geolocation) {
this.geolocation.getCurrentPosition().then((resp) => {
	        		this.lat = resp.coords.latitude;
	        		this.lng = resp.coords.longitude;
	        		console.log(resp.coords);
	        		// return this.lat;
        			
        		}).catch((error) => {
          			console.log('Error getting location', error);
        		});
  	// this.getLocation();
   }

getLocation(){
	return new Promise((resolve, reject)=>{
		this.geolocation.getCurrentPosition().then((resp) => {
	        		this.lat = resp.coords.latitude;
	        		this.lng = resp.coords.longitude;
	        		console.log(resp.coords);
	        		// return this.lat;
        			
        		}).catch((error) => {
          			console.log('Error getting location', error);
        		});
	});
	
}



}




