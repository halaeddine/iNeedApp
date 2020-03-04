import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-my-businesses',
  templateUrl: './my-businesses.page.html',
  styleUrls: ['./my-businesses.page.scss'],
})
export class MyBusinessesPage implements OnInit {

businesses:any;

  constructor(public navCtrl: NavController) {
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

   }

  ngOnInit() {
  }

  goToBusinessDetails(id){
this.navCtrl.navigateForward('businessdetails/'+ id);
}

}
