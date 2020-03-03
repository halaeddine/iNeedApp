import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BusinessesPage } from './businesses.page';

describe('BusinessesPage', () => {
  let component: BusinessesPage;
  let fixture: ComponentFixture<BusinessesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
