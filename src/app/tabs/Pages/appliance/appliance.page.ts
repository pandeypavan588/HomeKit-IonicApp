import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { SubscriptionLike } from 'rxjs';
import { AppRoutes } from 'src/app/constants/constant';
import { Appliance } from 'src/app/interface/appliance';
import { ApplianceService } from 'src/app/services/appliance/appliance.service';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { AddAppliancePage } from '../add-appliance/add-appliance.page';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Component({
  selector: 'app-appliance',
  templateUrl: './appliance.page.html',
  styleUrls: ['./appliance.page.scss'],
})
export class AppliancePage implements OnInit ,OnDestroy {

  subscription: SubscriptionLike;

  appliances : Appliance[] = [];
  //  = [
  //   {
  //     id: 1,
  //     applianceName: 'Washing machine machine',
  //     unit: 2.35,
  //     unitPrice: 5.6
  //   },
  //   {
  //     id: 2,
  //     applianceName: 'Washing ',
  //     unit: 2.35,
  //     unitPrice: 5.6
  //   }
    
  // ]

  constructor(
    public modalController: ModalController,
    public alertController: AlertController,
    public applianceService :ApplianceService,
    public storageService : StorageService,
    public router : Router,
    public firebaseService : FirebaseService,
    private firestore: AngularFirestore
    
  ) { 
    console.log('constructor called.....')
  }
  ngOnDestroy(): void {
    console.log("ngOnDestroy")
    
  }

  ngOnInit() {
    console.log('ngOnInit called.....')
    this.getAppliances();

    console.log(this.appliances[0])
  
    // this.storageService.getApplianceFromLocal("pavan@gmail.com").then((appliances)=>{
    //   this.appliances = this.appliances.concat(appliances);
    // })
      
  }


  getAppliances(){
    this.firebaseService.applianceList().subscribe((data)=>{
      this.appliances=data.map(e=>{
        return {
          id: e.payload.doc.id,
          applianceName: e.payload.doc.data()['applianceName'],
          unit: e.payload.doc.data()['unit'],
          unitPrice: e.payload.doc.data()['unitPrice']
        }
      })
    })

    // firebase.firestore().collection('appliances').get().then((data)=>{
    //   this.appliances = data.docs;
    // })
    
  }

  deleteAppliance(applianceId){
    console.log('deleteAppliance applianceId===>',applianceId)
    this.presentAlertConfirm(applianceId);
  }


  removeAppliance(index){
    console.log(index)
    // this.appliances.splice(index,1);
    this.firebaseService.deleteAppliance(index);

  }

  async presentAlertConfirm(index) {
    const alert = await this.alertController.create({
      
      header: 'Appliance',
      message: 'Sure you want to delete ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
            
          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log('Confirm Okay');
            this.removeAppliance(index);
          }
        }
      ]
    });

    await alert.present();
  }


  async presentModal() {
    const modal = await this.modalController.create({
        component: AddAppliancePage
    });
    
    return await modal.present();
    const { data } = await modal.onWillDismiss();
    console.log(data);

    
   
    
}



// async editApplianceModal(appliance:Appliance){
//   const modal = await this.modalController.create({
//     component: AddAppliancePage,
//     componentProps: {
//       id: appliance.id,
//       applianceName: appliance.applianceName,
//       unit: appliance.unit,
//       unitPrice: appliance.unitPrice
//     }
// });
// return await modal.present();

// }

editApplianceModal(appliance){
  console.log('editApplianceModal===>',appliance);
  this.router.navigate([AppRoutes.EDITAPPLIANCE,appliance])

}

}
