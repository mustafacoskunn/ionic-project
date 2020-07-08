import { StudentListPopoverComponent } from './../student-list-popover/student-list-popover.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentListPageRoutingModule } from './student-list-routing.module';

import { StudentListPage } from './student-list.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentListPageRoutingModule,
    TranslateModule
  ],
  entryComponents:[StudentListPopoverComponent]
  ,
  declarations: [StudentListPage,StudentListPopoverComponent]
})
export class StudentListPageModule {}
