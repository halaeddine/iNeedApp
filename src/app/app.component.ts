import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent  implements OnInit {
  public selectedIndex = 0; 
  public appPages = [];
   
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private auth: AuthenticationService
  ) 
  {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then ( () => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

       this.auth.authenticationState.subscribe(state => {
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
      url: 'logout()',
      icon: 'log-out'
    }   
  ]
        } else {
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
  }
  
}
