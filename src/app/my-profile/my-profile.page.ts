import { Component, OnInit } from '@angular/core';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { Storage } from '@ionic/storage';
import { HTTP } from '@ionic-native/http/ngx';
import { Router} from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

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
  constructor(private imagePicker: ImagePicker,
   private photoViewer: PhotoViewer,
   public storage:Storage,
   private http: HTTP,
   private router: Router,
   public toastController: ToastController,
   public loadingController: LoadingController
   ) {
     this.userdata = {};
    this.storage.get('userData').then(val=>{
    this.userid = JSON.stringify(val);
    this.getUserData(this.userid);
    // this.presentLoading();
   });

     // this.platform.ready().then(() => {
     
     // this.loaduser();
   
     // });

  }
  ngOnInit() {     
  }

showImage(){
  this.photoViewer.show(this.proImage);
}


SelectImage(){
  // this.auth.uploadProfileImage(this.images);
	let options= {
            maximumImagesCount: 1,
            allowEdit: true,
            targetWidth: 100,
            targetHeight: 100,
            quality: 50,
            outputType:1
      }
	 this.imagePicker.getPictures(options).then((results) => {
      this.images = results[0];

      // alert(this.images);

      // this.uploadProfileImage(this.images);
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
          this.updatedImage = JSON.parse(data.data).user.image;
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
      const { role, data } = res.onDidDismiss();
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