import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KayitOlPage } from './kayit-ol.page';

describe('KayitOlPage', () => {
  let component: KayitOlPage;
  let fixture: ComponentFixture<KayitOlPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KayitOlPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KayitOlPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
