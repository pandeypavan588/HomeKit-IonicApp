import { Injectable } from '@angular/core';
import { Appliance } from 'src/app/interface/appliance';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AddApplianceService {

  constructor(private storageService :StorageService) { }

  async createAppliance(keyUserId:string,appliance: Appliance): Promise<void> {
		return await this.storageService.saveApplianceToLocal(keyUserId,appliance).then().catch();
	}
}
