import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
// import { AuthenticationService } from '../services/authentication.service';
import { Storage } from '@ionic/storage';
import { HTTP } from '@ionic-native/http/ngx';
// import { NativeStorage } from '@ionic-native/native-storage/ngx';
@Component({
  selector: 'app-businesses',
  templateUrl: './businesses.page.html',
  styleUrls: ['./businesses.page.scss'],
})
export class BusinessesPage implements OnInit {

businesses:any;
// _get:any;
catId:any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HTTP,
    private storage:Storage) { 
  	
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.queryParams) {
        this.catId = this.router.getCurrentNavigation().extras.queryParams.id;
        this.getBusinessesWithCatId(this.catId);
      }
    });
    // this.businesses = [{"businessId":1,"userId":"1","catId":"1","businessName":"Hussein Barber","businessPhoneNumber":"70785760","businessDesc":"Head & Beard","businessLat":"33.3","businessLng":"34.5","businessViews":"1","category":{"catId":1,"catNameEn":"Barber","catNameAr":"\u062d\u0644\u0627\u0642","catIcon":"player104.png"}}];
  }

  ngOnInit() {}

getBusinessesWithCatId(id){
   return new Promise((resolve, reject)=>{
        this.http.get('http://www.brands-tech.com/api/getbusinesseswithsamecategory',{catId:id},{})
        .then(data => {
          this.businesses = JSON.parse(data.data);
          resolve(true);
        }).catch(err=>{
          reject(err);
        });
      });
}
goToBusinessDetails(id){

  this.businesses.forEach((val,key)=>{
    if(val.businessId == id){
      this.storage.set('businessDetailsSelected', JSON.stringify(val));
    }
  })
this.router.navigate(['businessdetails']);
}


}
