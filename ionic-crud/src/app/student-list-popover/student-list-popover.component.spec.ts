import { TranslateModule } from '@ngx-translate/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StudentListPopoverComponent } from './student-list-popover.component';

describe('StudentListPopoverComponent', () => {
  let component: StudentListPopoverComponent;
  let fixture: ComponentFixture<StudentListPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentListPopoverComponent ],
      imports: [
        IonicModule.forRoot(),
        TranslateModule.forChild(),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentListPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
