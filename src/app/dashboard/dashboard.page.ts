import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(private auth: AuthenticationService) {
// setTimeout(this.check(),2000);
   }

  ngOnInit() {
	this.auth.isAuthenticated();  
	
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
