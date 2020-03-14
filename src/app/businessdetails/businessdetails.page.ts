import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
// import { AuthenticationService } from '../services/authentication.service';
// import { Storage } from '@ionic/storage';
// import { NativeStorage } from '@ionic-native/native-storage/ngx';
@Component({
  selector: 'app-businessdetails',
  templateUrl: './businessdetails.page.html',
  styleUrls: ['./businessdetails.page.scss'],
})
export class BusinessdetailsPage implements OnInit {

 public _get:any;
 private details:any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    // private auth: AuthenticationService,
    ) {
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
// this.storage.getItem('businessDetailsSelected').then(val=>{
//         this.details = val;
//         console.log(val);
//       });
  }

  ngOnInit() {
    // this.route.params.subscribe(params => {
    //  this._get = params["id"];
    //   console.log(this._get);
      
      // this.auth.getBusinessDetails(this._get);
    // });
  }
// getBusinessDetails(id){
// this.auth.getBusinessDetails(id);
// }
}