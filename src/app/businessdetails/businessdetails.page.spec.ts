import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BusinessdetailsPage } from './businessdetails.page';

describe('BusinessdetailsPage', () => {
  let component: BusinessdetailsPage;
  let fixture: ComponentFixture<BusinessdetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessdetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessdetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
