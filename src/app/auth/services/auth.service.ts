import { Injectable } from '@angular/core';
 import { Plugins } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/constants/constant';
import { userInterface } from 'src/app/interface/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState = new BehaviorSubject(false);

  constructor(
    private platform: Platform,
    
    private router : Router
    ) {
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });
   }



   ifLoggedIn() {
    this.getFromLocalStorage('USER_INFO').then((response) => {
      if (response) {
        this.authState.next(true);
      }
    });

    
  }

  register(user:userInterface) {

    // this.saveToLocalStorage('USER_INFO', user).then((res)=>{
    //   console.log('Data saved to local')
    // })
    
  
  }

  async login(user:userInterface): Promise<any> {
    
    // return this.getFromLocalStorage('USER_INFO').then((res)=>{
    //   console.log('res====>',res.email);
    //   console.log(res.password)

    //   if(res.email===user.email && res.password===user.password){
    //     this.authState.next(true);
    //     return true;
    //   }
    //   else{
    //     this.authState.next(false);
    //     return false;
    //   }
      
      
    // })

    return this.saveToLocalStorage('USER_INFO', user).then((res)=>{
      console.log('Data saved to local')
      this.authState.next(true);
        return true;
    })
    



  }


  logout() {
    this.removeFromLocalStorage('USER_INFO').then(() => {
      this.router.navigateByUrl(AppRoutes.LOGIN)
      this.authState.next(false);
    });
  }

  isAuthenticated() {
    return this.authState.value;
  }

  



  async saveToLocalStorage(key: string, value: any): Promise<void> {
		return await Plugins.Storage.set({
			key,
			value: JSON.stringify(value)
		});
	}

	async getFromLocalStorage(key: string): Promise<any> {
		const ret = await Plugins.Storage.get({key});
		return JSON.parse(ret.value);
	}


	async removeFromLocalStorage(key: string): Promise<void> {
		return await Plugins.Storage.remove({key});
	}

	// async clearLocalStorage(isReset?: boolean): Promise<void> {
	// 	if(isReset){
	// 		//this.dataService.setExpenses([]);
	// 	}
	// 	return await Plugins.Storage.clear();
	// }
}
