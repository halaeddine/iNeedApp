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

  let navigationExtras: NavigationExtras = {
    queryParams: {
        id: id
    }
};
// for(var i=0; i<=this.auth.businesses; i++){
//   if(this.auth.businesses[i].businessId == id){
//     this.storage.set('businessDetailsSelected', this.auth.businesses[i]).then(()=>{
//       this.storage.get('businessDetailsSelected').then(val=>{
//        b = val;
//         console.log(val);
//       });
//     });
//   }
// }
    this.router.navigate(['businessdetails'],navigationExtras);
}


}
