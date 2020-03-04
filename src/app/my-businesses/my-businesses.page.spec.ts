import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyBusinessesPage } from './my-businesses.page';

describe('MyBusinessesPage', () => {
  let component: MyBusinessesPage;
  let fixture: ComponentFixture<MyBusinessesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyBusinessesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyBusinessesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
