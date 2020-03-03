import { Component } from '@angular/core';
import { HttpClient  } from '@angular/common/http';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
data:any;
  constructor(private http: HttpClient) {
  	
  }

test(){
	return new Promise((resolve, reject)=>{
  		this.http.get('http://192.168.0.104:3030/api/getallusers')
  		.subscribe(data => {
  			this.data = data[0].fname+" "+data[0].lname;
  			// alert("success: "+JSON.stringify(data));
  		}, (err)=>{
  			reject(err);
  			alert(JSON.stringify(err));
  		});
  	});
}
  

}
