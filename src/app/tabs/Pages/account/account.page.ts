import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/services/auth.service';
import { NotificationPage } from 'src/app/components/notification/notification.page';
import { AppRoutes } from 'src/app/constants/constant';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  constructor(
    private router: Router,
    public modalController: ModalController,
    public alertController: AlertController,
    public authService : AuthService
    ) { }

  ngOnInit() {
    // this.router.navigateByUrl("auth/login");
  }

  redirectToLogin(){
    this.router.navigateByUrl("/auth/login");
  }

  openNotification(){
    this.presentModal()
  }
  doLogout(){
    this.presentAlertConfirm()
  }


  async presentModal() {
    const modal = await this.modalController.create({
      component: NotificationPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }


  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      
      header: 'HomeKit',
      message: 'Sure you want to logout ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
            
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            // this.authService.logout();
            this.authService.logout().subscribe(() => {
              this.router.navigateByUrl(AppRoutes.LOGIN);
              console.log('Reset Done Moving to Login Page');
              const errorMsg = "You are Successfully Logged out !"
              // this.toastService.presentToast(errorMsg,'success');
          }, error => console.log(error));
          }
        }
      ]
    });

    await alert.present();
  }

  

}
