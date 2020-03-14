import { Component, OnInit } from '@angular/core';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { AuthenticationService } from '../services/authentication.service';
import { Storage } from '@ionic/storage';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})

export class MyProfilePage implements OnInit {
images:any;
public userid:string = "";
public userdataa:any = [];
proImage:any = '././assets/player104.png';
  constructor(private imagePicker: ImagePicker,
   private photoViewer: PhotoViewer,
   private auth:AuthenticationService,
   public storage:Storage,
   private route: ActivatedRoute) {
     // this.userdataa= "";
     this.userid = "";

  }
  ngOnInit() {
     this.storage.get('userData').then(val=>{
    this.userid = JSON.stringify(val);
    this.auth.getUserData(this.userid);
    this.userdataa = this.auth.getUserData(this.userid);
     alert(JSON.stringify(this.userdataa));
   })
         
         
         
         
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

}