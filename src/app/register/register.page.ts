import { Component, OnInit } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { Router, NavigationExtras } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
data:any = {
	username:null,
	fname:null,
	lname:null,
	password:null,
	password2:null
};
passConfirmed:any = 'red';
usernameExist:any='';
usernameExistColor:any='';
exists:boolean = false;
  constructor(private http: HTTP,private router: Router,public loadingController: LoadingController) { }

  ngOnInit() {
  }
checkUserAvailability(){
	setTimeout(()=>{
		if(this.data.username.length < 1){
			this.exists = false;
		}else{
			return new Promise((resolve, reject)=>{
		        this.http.post('http://www.brands-tech.com/api/checkusername',this.data,{})
		        .then(data => {
		        	this.exists = true;
		         if(JSON.parse(data.data).result == 'true'){
		         	console.log('cant use');
		         	this.usernameExist = 'Username Exists!';
		         	this.usernameExistColor = 'red';
		         }else{
		         	console.log('username nt exists');
		         	this.usernameExist = 'Username Doesn\'t Exist';
		         	this.usernameExistColor = 'green';
		         }
		          // this.dismissLoading();
		         resolve(true);
		        }).catch(err=>{
		          reject(err);
		          // this.dismissLoading();
		        });
		      });
		}
	},1000);
}

register(){
	console.log(this.data);
	this.presentLoading();
	return new Promise((resolve, reject)=>{
		        this.http.post('http://www.brands-tech.com/api/register',this.data,{})
		        .then(data => {
		         if(JSON.parse(data.data).result == 'true'){
		         	console.log('registered user');
		         	this.router.navigate(['login']);
		         }else{
		         	console.log('server error occured');
		         }
		          this.dismissLoading();
		         resolve(true);
		        }).catch(err=>{
		          reject(err);
		          this.dismissLoading();
		        });
		      });
}

comparePasswords(){
	if(this.data.password.length>0){
		if(this.data.password == this.data.password2){
			this.passConfirmed = 'green';
		}else{
			this.passConfirmed = 'red';
		}
	}else{
		this.passConfirmed = 'red';
	}
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
