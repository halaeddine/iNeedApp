import { Component, OnInit } from '@angular/core';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {
images:any;
proImage:any = '././assets/player104.png';
  constructor(private imagePicker: ImagePicker, private photoViewer: PhotoViewer) { }

  ngOnInit() {
  }

showImage(){
  this.photoViewer.show("http://www.brands-tech.com/public/images/player104.png");
}


image(){
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
  // for (var i = 0; i < results.length; i++) {
      // results[i]
  // }
}, (err) => { });
}

}
