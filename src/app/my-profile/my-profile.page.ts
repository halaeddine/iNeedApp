import { Component, OnInit, Inject } from '@angular/core';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { Storage } from '@ionic/storage';
import { HTTP } from '@ionic-native/http/ngx';
import { Router} from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Crop } from '@ionic-native/crop/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})

export class MyProfilePage implements OnInit {
images:any;
public userid:string = "";
public userdata:any = [];
proImage:any;
updatedImage:any;
numBusinesses:any;
loading:any;
private base64: Base64
  constructor(private imagePicker: ImagePicker,
    public appCom: AppComponent,
   private photoViewer: PhotoViewer,
   public storage:Storage,
   private http: HTTP,
   private router: Router,
   public toastController: ToastController,
   public loadingController: LoadingController,
   private crop: Crop
   ) {
     this.userdata = {};
    this.storage.get('userId').then(val=>{
    this.userid = JSON.stringify(val);
    this.getUserData(this.userid);
   });


  }
  ngOnInit() {     
  }

showImage(){
  this.photoViewer.show(this.proImage);
}


SelectImage(){
	let options= {
            maximumImagesCount: 1,
            allowEdit: true,
            targetWidth: 200,
            targetHeight: 200,
            quality: 50,
            outputType:0
      }

	 this.imagePicker.getPictures(options).then((results) => {
     if(results.length > 0){
         this.images = results[0];
          this.crop.crop(this.images, {quality: 75})
              .then(newImage => {
                this.base64.encodeFile(newImage).then((base64File: string) => {
                        let coppedImage = base64File.split('base64,')[1];
                        this.uploadProfileImage(coppedImage);
                      }, (err) => {
                        alert(err);
                      });
                
              },error => alert('Error cropping image'+ error));
     }
      }, (err) => {
        alert(err);
       });
} 


uploadProfileImage(data){
  return new Promise((resolve, reject)=>{
        this.http.post('http://www.brands-tech.com/api/uploadprofileimage',{'image':data,'userId':this.userid},{})
        .then(data => {
          alert(JSON.stringify(data));
          this.Toast("Profile Image Updated Successfully");
          this.proImage = JSON.parse(data.data).user.image;
          this.appCom.image = this.proImage;
          resolve(true);
        }).catch(err=>{
          reject(false);
        });
      });
}




 getUserData(id){
   this.presentLoading();
     return new Promise((resolve, reject)=>{
        this.http.get('http://www.brands-tech.com/api/getuserdata',{userId:id},{})
        .then(data => {
          this.userdata = JSON.parse(data.data);
          this.numBusinesses = this.userdata.businesses.length;
          this.proImage = this.userdata.image;
          this.dismissLoading();
           resolve(true);
          }).catch(err=>{
          reject(err);
          this.dismissLoading();
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
      duration: 2000
    }).then(res=>{
      res.present();
      res.onDidDismiss();
    });
    // this.loading.present();

    
    // console.log('Loading dismissed!');
  }
   dismissLoading(){
       setTimeout(()=>{
              this.loadingController.dismiss();
          },1000)
  
  }

}