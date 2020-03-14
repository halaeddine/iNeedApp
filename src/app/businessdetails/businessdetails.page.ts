import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
// import { AuthenticationService } from '../services/authentication.service';
import { Storage } from '@ionic/storage';
// import { NativeStorage } from '@ionic-native/native-storage/ngx';
@Component({
  selector: 'app-businessdetails',
  templateUrl: './businessdetails.page.html',
  styleUrls: ['./businessdetails.page.scss'],
})
export class BusinessdetailsPage implements OnInit {


details:any;
name:any;
phoneNumber:any;
desc:any;
views:any;
catEn:any;
catAr:any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storage: Storage
    ) {
     this.storage.get('businessDetailsSelected').then(val=>{
       this.details = JSON.parse(val);
       this.name = this.details.businessName;
       this.phoneNumber = this.details.businessPhoneNumber;
       this.desc = this.details.businessDesc;
       this.views = this.details.businessViews;
       this.catEn = this.details.category.catNameEn;
       this.catAr = this.details.category.catNameAr;
       console.log(this.details);
     });
  }

  ngOnInit() {}

}