import { Component, OnInit } from '@angular/core';
import { ImagePicker } from '@ionic-native/image-picker/ngx';


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {
images:any;
  constructor(private imagePicker: ImagePicker) { }

  ngOnInit() {
  }


image(){
	let options= {
maximumImagesCount: 1,
allowEdit: true,
targetWidth: 100,
targetHeight: 100,
quality: 50,
}
	this.imagePicker.getPictures(options).then((results) => {
    this.images = results[0];
  // for (var i = 0; i < results.length; i++) {
      // results[i]
  // }
}, (err) => { });
}

}
