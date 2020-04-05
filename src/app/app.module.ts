import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx'; //
import { StatusBar } from '@ionic-native/status-bar/ngx'; //
import { Geolocation } from '@ionic-native/geolocation/ngx'; //
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// import { HttpClientModule } from '@angular/common/http'; //
import { HTTP } from '@ionic-native/http/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { ImagePicker } from '@ionic-native/image-picker/ngx'; //
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx'; //
import { NativeStorage } from '@ionic-native/native-storage/ngx'; //
import { CallNumber } from '@ionic-native/call-number/ngx'; //
import { SMS } from '@ionic-native/sms/ngx'; //
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx'; //
import { GoogleMaps } from '@ionic-native/google-maps'; //
import { Crop } from '@ionic-native/crop/ngx'; //
import { Base64 } from '@ionic-native/base64/ngx'; //



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    // HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    StatusBar,
    NativeStorage,
    SplashScreen,
    ImagePicker,
    Crop,
    Base64,
    CallNumber,
    SMS,
    NativeGeocoder,
    GoogleMaps,
    Geolocation,
    PhotoViewer,
    HTTP,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
