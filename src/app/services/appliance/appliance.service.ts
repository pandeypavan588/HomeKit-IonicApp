import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Appliance } from 'src/app/interface/appliance';

@Injectable({
  providedIn: 'root'
})
export class ApplianceService {

  private readonly _appliances: BehaviorSubject<Appliance[]>;

  constructor() {
    this._appliances = new BehaviorSubject<Appliance[]>(null);
   }


   async getAppliances(): Promise<Appliance[]> {
    return this._appliances.getValue();
}

async setAppliances(expenses: Appliance[]): Promise<void> {
    
    return this._appliances.next(expenses);
}

getAppliancesSubscription(): BehaviorSubject<Appliance[]> {
    return this._appliances;
}
}
