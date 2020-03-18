import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './services/authentication.service';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent  implements OnInit {
  public selectedIndex = 0; 
  public appPages = [];
  username:any;
  image:any;
  loggedin:boolean;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private auth: AuthenticationService,
    private storage: Storage,
  ) 
  {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then ( () => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
     this.storage.get("userData").then(user=>{
      this.username = JSON.parse(user).username;
      this.image = JSON.parse(user).image;
       console.log(JSON.parse(user));
     });
     this.auth.authenticationState.subscribe(state => {
       this.loggedin = true;
        if (state) {
     this.appPages = [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: 'Home'
    },
    {
      title: 'My Profile',
      url: '/my-profile',
      icon: 'person'
    },
    {
      title: 'My Businesses',
      url: '/my-businesses',
      icon: 'Business'
    },
    {
      title: 'Logout',
      
      icon: 'log-out'
    }   
  ]
        } else {
          this.loggedin = false;
         this.appPages = [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: 'Home'
    },
    {
      title: 'Login',
      url: '/login',
      icon: 'log-in'
    }   
  ]
        }
    });
});
  }


   ngOnInit() {
    const path = window.location.pathname.split('dashboard/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
     // if(this.auth.checkToken()){
     //    this.auth.authenticationState.next(true);
     //  }
}
  
}
