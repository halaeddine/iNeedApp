import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { Router, NavigationExtras } from '@angular/router';
import { LoadingController } from '@ionic/angular';
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
  loading:any;
  // this.loggedIn:any;

  constructor(
    private router: Router,
    private http: HTTP,
    private auth: AuthenticationService,
    public loadingController: LoadingController) {
    this.categories = [];
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
  this.presentLoading();
       return new Promise((resolve, reject)=>{
        this.http.get('http://www.brands-tech.com/api/getallcategories',{},{})
        .then(data => {
          this.categories = JSON.parse(data.data);
          this.dismissLoading();
         resolve(true);
        }).catch(err=>{
          reject(err);
          this.dismissLoading();
        });
      });
 }

 presentLoading() {
 this.loading =  this.loadingController.create({
      message: 'Please wait...',
      // duration: 2000
    }).then(res=>{
      res.present();
      res.onDidDismiss();
    });
  }
  dismissLoading(){
       setTimeout(()=>{
              this.loadingController.dismiss();
          },1000)
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
