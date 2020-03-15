import { Component, OnInit } from '@angular/core';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { Storage } from '@ionic/storage';
import { HTTP } from '@ionic-native/http/ngx';
import { Router} from '@angular/router';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})

export class MyProfilePage implements OnInit {
images:any;
public userid:string = "";
public userdata:any = [];
proImage:any = '././assets/player104.png';

  constructor(private imagePicker: ImagePicker,
   private photoViewer: PhotoViewer,
   public storage:Storage,
   private http: HTTP,
   private router: Router
   ) {
    this.storage.get('userData').then(val=>{
    this.userid = JSON.stringify(val);
    this.getUserData(this.userid);
   });

     // this.platform.ready().then(() => {
     
     // this.loaduser();
   
     // });

  }
  ngOnInit() {     
  }

showImage(){
  this.photoViewer.show("http://www.brands-tech.com/public/images/player104.png");
}


// image(){
//   this.auth.uploadProfileImage(this.images);
// 	let options= {
//             maximumImagesCount: 1,
//             allowEdit: true,
//             targetWidth: 100,
//             targetHeight: 100,
//             quality: 50,
//             outputType:1
//       }
// 	 this.imagePicker.getPictures(options).then((results) => {
//       this.images = results[0];
//       this.auth.uploadProfileImage(this.images);
//       }, (err) => {
//         alert(err);
//        });
// }

 getUserData(id){
     return new Promise((resolve, reject)=>{
        this.http.get('http://www.brands-tech.com/api/getuserdata',{userId:id},{})
        .then(data => {
          this.userdata = JSON.parse(data.data);
           resolve(true);
          }).catch(err=>{
          reject(err);
        });
      });
 }
}