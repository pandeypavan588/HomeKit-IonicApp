import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  notifications = [
    {
      msg:'1 Have you ever missed an important notification shown in your device status bar? No worries!'
    },

    {
      msg:'1 Have you ever missed an important notification shown in your device status bar? No worries!'
    },

    {
      msg:'3 Have you ever missed an important notification shown in your device status bar? No worries!'
    },

    {
      msg:'4 Have you ever missed an important notification shown in your device status bar? No worries!'
    },

    {
      msg:'5 Have you ever missed an important notification shown in your device status bar? No worries!'
    },
    {
      msg:'5 Have you ever missed an important notification shown in your device status bar? No worries!'
    },
    {
      msg:'5 Have you ever missed an important notification shown in your device status bar? No worries!'
    },
    {
      msg:'5 Have you ever missed an important notification shown in your device status bar? No worries!'
    },
    {
      msg:'5 Have you ever missed an important notification shown in your device status bar? No worries!'
    },
    {
      msg:'5 Have you ever missed an important notification shown in your device status bar? No worries!'
    },
  ]

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  dismissModal() {
    
    this.modalController.dismiss()
      
    
  }


  deleteNotification(index){
    console.log(index)
    this.notifications.splice(index,1);

  }

}
