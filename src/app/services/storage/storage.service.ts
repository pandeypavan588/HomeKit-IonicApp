import { Injectable } from '@angular/core';
import {Plugins} from '@capacitor/core';
import { Appliance } from 'src/app/interface/appliance';
import { ApplianceService } from '../appliance/appliance.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private applianceService :ApplianceService) { }

	async saveApplianceToLocal(keyUserId:string,appliance: Appliance): Promise<void> {
		
		let applianceList: Appliance[] = [];
		return this.getFromLocalStorage(keyUserId).then((appliances: Appliance[]) => {
			if (appliances == null) {
				applianceList.push(appliance);
			} else {
				applianceList = appliances;
				applianceList.push(appliance);
			}
		}).then(() => {
			this.saveToLocalStorage(keyUserId, applianceList).then(()=> {
				this.applianceService.setAppliances(applianceList);
			})
		}).catch((err) => console.log(err));
	}

	async getApplianceFromLocal(userId:string): Promise<Appliance[]> {
		return await this.getFromLocalStorage(userId).then((appliances: Appliance[]) => {
			return appliances;
		});
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

	async clearLocalStorage(isReset?: boolean): Promise<void> {
		if(isReset){
			this.applianceService.setAppliances([]);
		}
		return await Plugins.Storage.clear();
	}
}
