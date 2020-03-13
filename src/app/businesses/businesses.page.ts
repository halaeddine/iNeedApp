import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-businesses',
  templateUrl: './businesses.page.html',
  styleUrls: ['./businesses.page.scss'],
})
export class BusinessesPage implements OnInit {

// businesses:any;
_get:any;
  constructor(public navCtrl: NavController,private route: ActivatedRoute,private auth:AuthenticationService) { 
  	// this.businesses = [{
  	// 	'id':1,
  	// 	'businessName':'Hussein Barber',
  	// 	'businessPhoneNumber':'70785760',
  	// 	'businessDesc':'abc123',
  	// 	'businessViews':'30'
  	// },
  	// {	'id':2,
  	// 	'businessName':'Bilal Barber',
  	// 	'businessPhoneNumber':'70785760',
  	// 	'businessDesc':'abc1234',
  	// 	'businessViews':'10'
  	// }];
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
     this._get = params["id"];
      console.log(this._get);
});
  this.auth.getBusinessesWithCatId(this._get);
  }

goToBusinessDetails(id){
  let navigationExtras: NavigationExtras = {
    queryParams: {
        id: id
    }
};
    this.navCtrl.navigateForward(['businessdetails/'+ id],navigationExtras);
}


}
