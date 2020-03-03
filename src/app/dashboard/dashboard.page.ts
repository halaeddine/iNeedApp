import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import {NavController} from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  public searchTerm: string = "";
  public categories:any = [];
  public cats:any = [];

  constructor(private route: ActivatedRoute ,public navCtrl: NavController, private auth: AuthenticationService) {

// setTimeout(this.check(),2000);


    this.categories = [{
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

  }

   gotoHomePage(id) {

    this.navCtrl.navigateForward('businessdetails/'+ id);

  }

  ngOnInit() {
    this.setFilteredItems();
    // this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    /*this.auth.isAuthenticated();  */
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
// 		alert('asd');
// 	}
// }
logout(){
	this.auth.logout();
}
}
