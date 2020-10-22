import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddAppliancePage } from './add-appliance.page';

describe('AddAppliancePage', () => {
  let component: AddAppliancePage;
  let fixture: ComponentFixture<AddAppliancePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAppliancePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddAppliancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
