import { Component, OnInit } from '@angular/core';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { AuthenticationService } from '../services/authentication.service';
import { Storage } from '@ionic/storage';
const userData = 'userData';
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})

export class MyProfilePage implements OnInit {
images:any;
userInfo:any;
proImage:any = '././assets/player104.png';
  constructor(private imagePicker: ImagePicker,
   private photoViewer: PhotoViewer,
   private auth:AuthenticationService,
   private storage:Storage) { }

  ngOnInit() {
    this.getUserData();
  }

showImage(){
  this.photoViewer.show("http://www.brands-tech.com/public/images/player104.png");
}


image(){
  
  this.auth.uploadProfileImage(this.images);
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
      this.auth.uploadProfileImage(this.images);
      }, (err) => {
        alert(err);
       });
}


getUserData(){
  this.storage.get('userData').then(val=>{
    this.userInfo = val;
    alert(JSON.stringify(val));
  })
}
}
