import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import {NavController} from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  public searchTerm: string = "";
  public categories:any = [];
  public cats:any = [];
  // this.loggedIn:any;

  constructor(private imagePicker: ImagePicker,private route: ActivatedRoute ,public navCtrl: NavController, private auth: AuthenticationService) {
    this.categories = [
  {
    'icon':'././assets/icon/favicon.png',
    'id':1,
    'name':'Barber Shop / حلاق'
  },
  {
    'icon':'././assets/icon/favicon.png',
    'id':2,
    'name':'hussein / حداد'
  },
  {
    'icon':'././assets/icon/favicon.png',
    'id':3,
    'name':'bilal / حلاق'
  }];
// this.auth.checkToken();
}
   gotoBusinessesPage(id) {

    this.navCtrl.navigateForward('businesses/'+ id);

  }

  ngOnInit() {
    this.setFilteredItems();
   
    // this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }


  
 setFilteredItems() {

   this.cats = this.categories;
    this.cats = this.filterItems(this.searchTerm);
 }

 filterItems(searchTerm) {
   console.log(this.searchTerm);
    return this.cats.filter(item => {
      return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

// check(){
// 	if(this.auth.isAuthenticated()){
// 		alert('in');
//     return true;
// 	}
//   else{
//     alert("out")
//     return false;
//   }
// }

}
