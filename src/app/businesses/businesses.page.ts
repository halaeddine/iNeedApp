import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-businesses',
  templateUrl: './businesses.page.html',
  styleUrls: ['./businesses.page.scss'],
})
export class BusinessesPage implements OnInit {

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
