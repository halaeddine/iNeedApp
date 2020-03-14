import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
// import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { ActivatedRoute } from '@angular/router';
import { Router, NavigationExtras } from '@angular/router';
// import { Storage } from '@ionic/storage';
import { HTTP } from '@ionic-native/http/ngx';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  public searchTerm: string = "";
  public categories:any;
  public cats:any = [];
  public id:any;
  
  // this.loggedIn:any;

  constructor(
    private router: Router,
    private http: HTTP,
    private auth: AuthenticationService) {
    this.getAllCategories();
}
gotoBusinessesPage(id) {
var id = id;
          let navigationExtras: NavigationExtras = {
              queryParams:{
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
getAllCategories(){
       return new Promise((resolve, reject)=>{
        this.http.get('http://www.brands-tech.com/api/getallcategories',{},{})
        .then(data => {
          this.categories = JSON.parse(data.data);
         resolve(true);
        }).catch(err=>{
          reject(err);
        });
      });
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
