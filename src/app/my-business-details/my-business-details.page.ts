import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router, NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HTTP } from '@ionic-native/http/ngx';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { ImagePicker } from '@ionic-native/image-picker/ngx';


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
  images:any;
  edit:boolean= false;
  data:any = {};
  b:any = {};
  constructor(
    private route: ActivatedRoute,
    public storage:Storage,
    public toastController: ToastController,
    public loadingController: LoadingController,
    private http: HTTP,
    private imagePicker: ImagePicker,
    private router: Router) { 
    this.getCategories();
     this.storage.get('myBusinessDetailsSelected').then(val=>{

       this.details = JSON.parse(val);
       console.log(this.details);
       this.name = this.details.businessName;
       this.phoneNumber = this.details.businessPhoneNumber;
       this.desc = this.details.businessDesc;
       this.views = this.details.businessViews;
       this.catEn = this.details.category.catNameEn;
       this.catAr = this.details.category.catNameAr;
       this.images = this.details.images;
     });
  };

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

    uploadBusinessImages(data){
      return new Promise((resolve, reject)=>{
            this.http.post('http://www.brands-tech.com/api/uploadbusinessimages',{'images':JSON.stringify(data),'businessId':JSON.stringify(this.details.businessId)},{})
            .then(data => {
              this.Toast("Images Updated Successfully");
              this.images = JSON.parse(data.data).images;
              resolve(true);
            }).catch(err=>{
              reject(false);
            });
          });
    }

    addImages(){
      let options= {
                maximumImagesCount: 1,
                allowEdit: true,
                targetWidth: 200,
                targetHeight: 200,
                quality: 50,
                outputType:1
          }

       this.imagePicker.getPictures(options).then((results) => {
         alert(results.length);
         if(results.length > 0){
           this.uploadBusinessImages(results);
         }
          }, (err) => {
            alert(err);
           });
    }



    deleteImage(imageId){
      let id = JSON.stringify(imageId);
      let businessId = JSON.stringify(this.details.businessId);
      console.log(id);
        return new Promise((resolve, reject)=>{
            this.http.post('http://www.brands-tech.com/api/deletebusinessimage',{imageId:id, businessId:businessId},{})
            .then(data => {
              if(JSON.parse(data.data).result == 'true'){
                this.images = JSON.parse(data.data).images;
              }         
               resolve(true);
              }).catch(err=>{
              reject(err);
            });
          });
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
