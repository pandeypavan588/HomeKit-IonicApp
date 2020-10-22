import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './auth/services/auth.service';
import { Router } from '@angular/router';
import { AppRoutes } from './constants/constant';
import { Plugins } from '@capacitor/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService : AuthService,
    private router : Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      Plugins.Device.getInfo().then((deviceInfo) => {
        if (deviceInfo.platform !== 'web') {
            Plugins.SplashScreen.hide();
            Plugins.StatusBar.show();
        }

    });

      this.authService.authState.subscribe(state=>{
        if(state){
          this.router.navigateByUrl(AppRoutes.SCAN)
        }else{
          this.router.navigateByUrl(AppRoutes.LOGIN)
        }
      }

      );
    });
  }





}
