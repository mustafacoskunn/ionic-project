import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QrCodeLoginPage } from './qr-code-login.page';

describe('QrCodeLoginPage', () => {
  let component: QrCodeLoginPage;
  let fixture: ComponentFixture<QrCodeLoginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrCodeLoginPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QrCodeLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
