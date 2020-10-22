import { TestBed } from '@angular/core/testing';

import { AddApplianceService } from './add-appliance.service';

describe('AddApplianceService', () => {
  let service: AddApplianceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddApplianceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
