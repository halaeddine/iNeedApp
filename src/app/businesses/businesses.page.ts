import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Storage } from '@ionic/storage';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
@Component({
  selector: 'app-businesses',
  templateUrl: './businesses.page.html',
  styleUrls: ['./businesses.page.scss'],
})
export class BusinessesPage implements OnInit {

// businesses:any;
_get:any;
data:any;
  constructor(public navCtrl: NavController,
    private route: ActivatedRoute,
    private router: Router,
    private auth:AuthenticationService,
    private storage:Storage) { 
  	this.businesses = [{
  		'id':1,
  		'businessName':'Hussein Barber',
  		'businessPhoneNumber':'70785760',
  		'businessDesc':'abc123',
  		'businessViews':'30'
  	},
  	{	'id':2,
  		'businessName':'Bilal Barber',
  		'businessPhoneNumber':'70785760',
  		'businessDesc':'abc1234',
  		'businessViews':'10'
  	}];

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.data) {
        this.data = this.router.getCurrentNavigation().extras.data.id;
        console.log(this.data);
      }
    });
  }

  ngOnInit() {
//     this.route.params.subscribe(params => {
//      this._get = params["id"];
//       console.log(this._get);
// });
  // this.auth.getBusinessesWithCatId(this._get);
  }

goToBusinessDetails(id){
//   let navigationExtras: NavigationExtras = {
//     queryParams: {
//         id: id
//     }
// };
// for(var i=0; i<=this.auth.businesses; i++){
//   if(this.auth.businesses[i].businessId == id){
//     this.storage.set('businessDetailsSelected', this.auth.businesses[i]).then(()=>{
//       this.storage.get('businessDetailsSelected').then(val=>{
//         // this.details = val;
//         console.log(val);
//       });
//     });
//   }
// }
    // this.navCtrl.navigateForward(['businessdetails/'+ id],navigationExtras);
}


}
