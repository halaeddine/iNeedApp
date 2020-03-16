import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router, NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HTTP } from '@ionic-native/http/ngx';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-my-business-details',
  templateUrl: './my-business-details.page.html',
  styleUrls: ['./my-business-details.page.scss'],
})
export class MyBusinessDetailsPage implements OnInit {

categories:any;
loading:any;
details:any;
name:any;
catEn:any;
catAr:any;
phoneNumber:any;
views:any;
desc:any;
edit:boolean= false;
data:any = {};
b:any = {};
  constructor(
  	private route: ActivatedRoute,
  	public storage:Storage,
  	public toastController: ToastController,
  	public loadingController: LoadingController,
  	private http: HTTP,
    	private router: Router) { 
  	this.getCategories();
  	 this.storage.get('myBusinessDetailsSelected').then(val=>{
  	 	this.details = JSON.parse(val);
  	 	this.name = this.details.businessName;
  	 	this.phoneNumber = this.details.businessPhoneNumber;
  	 	this.desc = this.details.businessDesc;
  	 	this.views = this.details.businessViews;
  	 	this.catEn = this.details.category.catNameEn;
  	 	this.catAr = this.details.category.catNameAr;
  	 });
  }

  ngOnInit() {
  }

getCategories(){
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

editBusiness(){
	this.edit = true;
}
applyEditBusiness(){
	this.presentLoading();
	return new Promise((resolve, reject)=>{
        this.http.post('http://www.brands-tech.com/api/editbusiness',this.details,{})
        .then(data => {
        	this.details = JSON.parse(data.data).business;
        	this.storage.set('myBusinessDetailsSelected', JSON.stringify(this.details));
        		this.name = this.details.businessName;
  	 	this.phoneNumber = this.details.businessPhoneNumber;
  	 	this.desc = this.details.businessDesc;
  	 	this.views = this.details.businessViews;
  	 	this.catEn = this.details.category.catNameEn;
  	 	this.catAr = this.details.category.catNameAr;
        	this.Toast('Business Updated Successfully');    
	this.cancelEditBusiness();
	this.dismissLoading();        
           resolve(true);
          }).catch(err=>{
          	this.dismissLoading(); 
          	this.Toast('Can\'t update business');
          reject(err);
        });
      });
} 
cancelEditBusiness(){
this.edit = false;
}

 async Toast(data) {
    const toast = await this.toastController.create({
      message: data,
      duration: 4000
    });
    toast.present();
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
  
}
