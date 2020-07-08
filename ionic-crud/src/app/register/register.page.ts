import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { RegisterService } from "./../services/register.service";
import { Component, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage";
import {
  ToastController,
  AlertController,
  NavController,
  LoadingController,
} from "@ionic/angular";
import { Login } from "../models/login";
import { stringify } from "querystring";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"],
})
export class RegisterPage implements OnInit {
  user: any;
  textList: any;
  loading: any;
  chooseLanguage: any;

  constructor(
    private registerService: RegisterService,
    private toastController: ToastController,
    private storage: Storage,
    private alertController: AlertController,
    private nav: NavController,
    private loadingController: LoadingController,
    public translate: TranslateService
  ) {
    this.chooseLanguage = this.translate.getDefaultLang();
  }
  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
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

  languageCheck() {
    this.translate.get("alertToastMessage").subscribe((text: string) => {
      this.textList = text;
    });
  }
  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: "my-custom-class",
      backdropDismiss: false,
    });
    await this.loading.present();

    const { role, data } = await this.loading.onDidDismiss();
  }
  alertText: any;
  async presentAlertMultipleButtons() {
    this.translate.get("alertRegister").subscribe((text: string) => {
      this.alertText = text;
    });

    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header:
        this.alertText.alertHeaderHello +
        this.user.name +
        this.alertText.alertHeaderText,
      subHeader: this.alertText.alertSubHeaderText,
      message: this.alertText.alertMessage,
      buttons: [this.alertText.alertButton],
    });

    await alert.present();
  }

  ngOnInit() {
    this.user = new Login();
  }
  register() {
    if (this.user.email && this.user.password && this.user.name) {
      this.presentLoading();
      this.registerService.register(this.user).subscribe((response) => {
        if (response) {
          this.user = response;
          this.storage.set("account", this.user);
          this.presentAlertMultipleButtons();
          this.nav.navigateRoot(["student-list"]);
          this.loading.dismiss();
        } else {
          this.loading.dismiss();
          this.languageCheck();
          this.presentToast(this.textList.textAlreadyExist);
        }
      });
    } else {
      this.languageCheck();
      this.presentToast(this.textList.textNotEmpty);
    }
  }
}
