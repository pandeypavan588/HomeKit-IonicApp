import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/services/auth.service';
import { NotificationPage } from 'src/app/components/notification/notification.page';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  slidersArray = [
    {
      header:'Scan Documents',
      imgSrc: './assets/slider/scan.png',
      content: 'Best QR scanners app for your smartphones. Only with mobile phones that support photo taking, you can quickly read the information'
    },
    {
      header:'Appliance',
      imgSrc: './assets/slider/appliance.png',
      content: 'Latest Home Appliances for your home. Compare different brands and choose from a wide range of home appliance products at great offers'
    },
    {
      header:'News Feed',
      imgSrc: './assets/slider/news.png',
      content: ' Latest and Breaking News on news feed. Explore news feed profile at Times of India for photos, videos and latest news of news feed.'
    },
  ]

  constructor(
    public modalController: ModalController,
    public alertController: AlertController,
    public authService : AuthService
    ) { }

  ngOnInit() {
  }

  sliderimages =[
    {url:'assets/logo.png'},
    {url:'assets/logo.png'},
    {url:'assets/logo.png'},
  ]


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
            this.authService.logout();
          }
        }
      ]
    });

    await alert.present();
  }

}
