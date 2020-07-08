import { TranslateService } from '@ngx-translate/core';
import { Storage } from "@ionic/storage";
import {
  ToastController,
  NavController,
  LoadingController,
} from "@ionic/angular";
import { Login } from "./../models/login";
import { LoginServiceService } from "./../services/login-service.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  user: any;
  loading: any;
  textList:any;


  constructor(
    private loginService: LoginServiceService,
    private nav: NavController,
    private toastController: ToastController,
    private storage: Storage,
    private loadingController: LoadingController,
    private translate:TranslateService,
  ) {
   
  }

  ngOnInit() {
    this.user = new Login();

    this.storage.get("account").then((val) => {});
    
  }
  ionViewWillEnter() {
    this.storage.clear();
  }
  languageCheck(){
    this.translate.get('alertToastMessage').subscribe( (text: string) => {
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

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }

  loginInfo() {
    if (!this.user.email || !this.user.password) {
      this.languageCheck();
      this.presentToast(this.textList.textNotEmpty);
    } else {
      this.presentLoading();

      this.loginService.login(this.user).subscribe((response) => {
        if (response) {
          this.storage.clear();
          this.user = response;
          this.storage.set("account", this.user);
          this.loading.dismiss();
          this.nav.navigateRoot(["student-list"]);
      
        } else {
          this.loading.dismiss();
          this.languageCheck();
          this.presentToast(this.textList.errorInfo);
        }
      });
    }
  }
}
