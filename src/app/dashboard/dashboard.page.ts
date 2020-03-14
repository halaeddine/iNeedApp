import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { ActivatedRoute } from '@angular/router';
import { Router, NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  public searchTerm: string = "";
  public categories:any = [];
  public cats:any = [];
  public id:any;
  // this.loggedIn:any;

  constructor(private imagePicker: ImagePicker,
    private router: Router,
    private auth: AuthenticationService,
    private storage: Storage) {
    this.categories = [{"catId":1,"catNameEn":"Barber","catNameAr":"\u062d\u0644\u0627\u0642","catIcon":"player104.png"},{"catId":2,"catNameEn":"Carpenter","catNameAr":"\u0646\u062c\u0627\u0631","catIcon":"player104.png"},{"catId":3,"catNameEn":"Iron Smith","catNameAr":"\u062d\u062f\u0627\u062f","catIcon":"player104.png"},{"catId":4,"catNameEn":"Painter","catNameAr":"\u062f\u0647\u0627\u0646","catIcon":"player104.png"}];

}
gotoBusinessesPage(id) {
          let navigationExtras: NavigationExtras = {
              data: {
                  id: id
              }
          };
          this.router.navigate(['businesses'],navigationExtras);
  }

  ngOnInit() {

  
     // this.auth.getAllCategories().then(()=>{
     //     this.setFilteredItems();
     // });

    // this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }


  
 // setFilteredItems() {

 //   this.cats = this.auth.categories;
 //    this.cats = this.filterItems(this.searchTerm);
 // }

 // filterItems(searchTerm) {
 //   console.log(this.searchTerm);
 //    return this.cats.filter(item => {
 //      return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
 //    });
 //  }
}
