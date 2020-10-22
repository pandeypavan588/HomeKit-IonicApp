import { Injectable } from "@angular/core";
import { Plugins } from "@capacitor/core";
import { Platform } from "@ionic/angular";
import { BehaviorSubject, Observable, throwError } from "rxjs";

import { Router } from "@angular/router";
import { AppRoutes } from "src/app/constants/constant";
import { userInterface } from "src/app/interface/user";
import { fromPromise } from "rxjs/internal-compatibility";

import * as firebase from "firebase";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  authState = new BehaviorSubject(false);

  constructor(
    private platform: Platform,
    private fireAuth: AngularFireAuth,
    private router: Router
  ) {
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });
  }

  ifLoggedIn() {
    // this.getFromLocalStorage("USER_INFO").then((response) => {
    //   if (response) {
    //     this.authState.next(true);
    //   }
    // });

    this.fireAuth.onAuthStateChanged((user)=>{
      console.log('User=====>',user)
      if(user){
        this.authState.next(true);
      }
    })
  }

  async login(user: userInterface): Promise<any> {
    return this.saveToLocalStorage("USER_INFO", user).then((res) => {
      console.log("Data saved to local");
      this.authState.next(true);
      return true;
    });
  }

  registerWithEmailAndPassword(
    email: string,
    password: string
  ): Observable<firebase.auth.UserCredential> {
    return fromPromise(
      this.fireAuth.createUserWithEmailAndPassword(email, password)
    );
  }

  loginWithEmailAndPassword(
    email: string,
    password: string
  ): Observable<firebase.auth.UserCredential | void> {
    return fromPromise(
      this.fireAuth.signInWithEmailAndPassword(email, password)
    );
  }

  // logout() {
  //   this.removeFromLocalStorage("USER_INFO").then(() => {
  //     this.router.navigateByUrl(AppRoutes.LOGIN);
  //     this.authState.next(false);
  //   });
  // }


  logout(): Observable<void> {
    return fromPromise(this.fireAuth.signOut());
}

  isAuthenticated() {
    return this.authState.value;
    

  }

  async saveToLocalStorage(key: string, value: any): Promise<void> {
    return await Plugins.Storage.set({
      key,
      value: JSON.stringify(value),
    });
  }

  async getFromLocalStorage(key: string): Promise<any> {
    const ret = await Plugins.Storage.get({ key });
    return JSON.parse(ret.value);
  }

  async removeFromLocalStorage(key: string): Promise<void> {
    return await Plugins.Storage.remove({ key });
  }

  async clearLocalStorage(isReset?: boolean): Promise<void> {
    if (isReset) {
      //this.dataService.setExpenses([]);
    }
    return await Plugins.Storage.clear();
  }
}
