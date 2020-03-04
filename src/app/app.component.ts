import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent  implements OnInit {
  public selectedIndex = 0; 
  public appPages = [
    {
      title: 'Home',
      url: '/dashboard',
      icon: 'Home'
    },
<<<<<<< HEAD
    /*{
      title: 'businesses',
      url: 'businesses/businesses.page',
      icon: 'business'
    },*/
=======
>>>>>>> 7d9067478e6f8bb617e91e229e2bcffd0a698fe1
    {
      title: 'Login',
      url: '/login',
      icon: 'log-in'
    }   
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

   ngOnInit() {
    const path = window.location.pathname.split('dashboard/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
  
}
