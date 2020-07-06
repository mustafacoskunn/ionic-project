import { ApiService } from "./../services/api.service";
import { Component, OnInit } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import { MenuController, PopoverController } from "@ionic/angular";
import { StudentListPopoverComponent } from '../student-list-popover/student-list-popover.component';

@Component({
  selector: "app-student-list",
  templateUrl: "./student-list.page.html",
  styleUrls: ["./student-list.page.scss"],
})
export class StudentListPage {
  studentData: any;
  name: any;
  constructor(
    public apiService: ApiService,
    public router: Router,
    private storage: Storage,
    private menu: MenuController,
    private popoverController: PopoverController,
  ) {
    this.studentData = [];
    this.storage.get("name").then((val) => {
      this.studentData.name = val;
      this.name = val;
    });
  }

  openCustom() {
    this.menu.enable(true, "custom");
    this.menu.open("custom");
  }
  async popOver(item) {
    const popover = await this.popoverController.create({
      component: StudentListPopoverComponent,
      cssClass: 'my-custom-class',
      translucent: true,
      componentProps: {
        item: item
      }
    });

    popover.onDidDismiss().then(result => {
 //popover dissmis olduğunda yeniden çaığır
      this.getAllStudents();

    });
    return await popover.present();
  }



ngOnInit() { }


ionViewWillEnter() {
  this.getAllStudents();
}

async getAllStudents() {
  await this.storage.get("id").then((val) => {
    this.studentData.created_id = val;
    if (!val) {
      this.router.navigate(["login"]);
    }
  });

  console.log(this.studentData.created_id);
  this.apiService
    .getList(this.studentData.created_id)
    .subscribe((response) => {
      this.studentData = response;
    });
}

deleteData(id) {
  this.studentData.id = id;
  console.log(this.studentData.id);
  this.apiService.deleteItem(this.studentData.id).subscribe((response) => {
    console.log(response);
    this.getAllStudents();
  });
}
studentEdit(item) {
  let navigationExtras: NavigationExtras = {
    state: {
      data: item,
    },
  };

  this.router.navigate(["student-edit"], navigationExtras);
}
cikisYap() {
  this.storage.clear();
  this.router.navigate(["login"]);
}
}
