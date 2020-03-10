import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-businessdetails',
  templateUrl: './businessdetails.page.html',
  styleUrls: ['./businessdetails.page.scss'],
})
export class BusinessdetailsPage implements OnInit {

 public _get:any;
 private details:any;

  constructor(public navCtrl: NavController,private route: ActivatedRoute,private auth: AuthenticationService) {
  	this.details = {
  		'businessName':'Barber Hussein',
  		'businessPhoneNumber':'70785760',
  		'businessDesc' : 'New offers on the hair cut',
  		'businessViews': '30',
  		'businessCat': {
  			'catNameEn': 'Barber',
  			'catNameAr': 'حلاق'
  		}
  	};

  }

  ngOnInit() {
    this._get = this.route.snapshot.paramMap.get('id');
    this.getBusinessDetails(this._get);
  }
getBusinessDetails(id){
this.auth.getBusinessDetails(id);
}
}