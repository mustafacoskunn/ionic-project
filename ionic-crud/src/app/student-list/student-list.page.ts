import { TranslateService } from "@ngx-translate/core";
import { Login } from "./../models/login";
import { ApiService } from "../services/student-crud.service";
import { Component, OnInit } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import {
  MenuController,
  PopoverController,
  NavController,
  LoadingController,
} from "@ionic/angular";
import { StudentListPopoverComponent } from "../student-list-popover/student-list-popover.component";

@Component({
  selector: "app-student-list",
  templateUrl: "./student-list.page.html",
  styleUrls: ["./student-list.page.scss"],
})
export class StudentListPage {
  studentData: any;
  accountData: any;
  loading: any;
  chooseLanguage: any;
  constructor(
    private apiService: ApiService,
    private router: Router,
    private storage: Storage,
    private menu: MenuController,
    private popoverController: PopoverController,
    private nav: NavController,
    private loadingController: LoadingController,
    private translate: TranslateService
  ) {
    this.studentData = [];
    this.accountData = new Login();

    this.storage.get("account").then((val) => {
      this.accountData = val;
      this.getAllStudents();
    });
    this.chooseLanguage = this.translate.getDefaultLang();
  }
  changeLanguage() {
    if (this.chooseLanguage == "tr") this.translate.setDefaultLang("tr");
    if (this.chooseLanguage == "en") this.translate.setDefaultLang("en");
  }
  loadFlags() {
    setTimeout(() => {
      let buttonElements = document.querySelectorAll(
        "div.alert-radio-group button"
      );

      for (let index = 0; index < buttonElements.length; index++) {
        let buttonElement = buttonElements[index];
        let optionLabelElement = buttonElement.querySelector(
          ".alert-radio-label"
        );
        optionLabelElement.innerHTML +=
          '<img src="../assets/img/' +
          index +
          '.png" style="width:30px;height:30px;float:right;"/>';
      }
    }, 50);
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

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: "my-custom-class",
      backdropDismiss: false,
    });
    await this.loading.present();

    const { role, data } = await this.loading.onDidDismiss();
  }

  ngOnInit() {}

  ionViewWillEnter() {
    // this.getAllStudents();
  }

  getAllStudents() {
    this.presentLoading();
    if (!this.accountData) {
      this.router.navigate(["login"]);
      this.loading.dismiss();
    }

    this.apiService.getList(this.accountData.id).subscribe((response) => {
      this.studentData = response;

      this.loading.dismiss();
    });
  }
  addStudent() {
    this.nav.navigateRoot(["student-create"]);
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
    this.nav.navigateRoot(["login"]);
    this.storage.clear();
  }
}
