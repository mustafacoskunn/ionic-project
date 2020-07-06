import { Login } from './../models/login';
import { async } from '@angular/core/testing';
import { ApiService } from "../services/student-crud.service";
import { Component, OnInit } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import { MenuController, PopoverController, NavController } from "@ionic/angular";
import { StudentListPopoverComponent } from "../student-list-popover/student-list-popover.component";

@Component({
  selector: "app-student-list",
  templateUrl: "./student-list.page.html",
  styleUrls: ["./student-list.page.scss"],
})
export class StudentListPage {
  studentData: any;
  accountData: any;
  constructor(
    private apiService: ApiService,
    private router: Router,
    private storage: Storage,
    private menu: MenuController,
    private popoverController: PopoverController,
    private nav: NavController,
  ) {
    this.studentData = [];
    this.accountData=new Login();
    this.storage.get("account").then((val) => {
      this.accountData = val;
      this.getAllStudents();
    });
  
  }

  openCustom() {
    this.menu.enable(true, "custom");
    this.menu.open("custom");
  }
  async popOver(item) {
    const popover = await this.popoverController.create({
      component: StudentListPopoverComponent,
      cssClass: "my-custom-class",
      translucent: true,
      componentProps: {
        item: item,
      },
    });

    popover.onDidDismiss().then((result) => {
      //popover dissmis olduğunda yeniden çaığır
      this.getAllStudents();
    });
    return await popover.present();
  }

  ngOnInit() {
  
  }
  

  ionViewWillEnter() {
    this.getAllStudents();
  }

    getAllStudents() {
    if (!this.accountData) {
      this.router.navigate(["login"]);
    }

      this.apiService.getList(this.accountData.id).subscribe((response) => {
      this.studentData = response;
     });
  }

  deleteData(id) {
    this.apiService.deleteItem(id).subscribe((response) => {
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
  logoutInfo() {
    this.storage.clear();
    this.nav.navigateRoot(["login"]);
  }
}
