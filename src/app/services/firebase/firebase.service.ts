import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  collectionName = 'appliances';

  constructor(
    private firestore: AngularFirestore
  ) { }

  async createAppliance(record) {
    return await this.firestore.collection(this.collectionName).add(record);
  }

  applianceList() {
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }

  updateAppliance(recordID, record) {
     return this.firestore.doc(this.collectionName + '/' + recordID).update(record);
  }

  getApplianceById(recordID) {
    return this.firestore.collection(this.collectionName).doc(recordID).get()
  }

  deleteAppliance(record_id) {
    this.firestore.doc(this.collectionName + '/' + record_id).delete();
  }
}
