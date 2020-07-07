import { Storage } from "@ionic/storage";
import { ToastController, NavController } from "@ionic/angular";
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
  emptyInfo = "Mail veya Şifre Boş Bırakılamaz !";
  errorInfo = "Mail veya Şifre Yanlış !";
  constructor(
    private loginService: LoginServiceService,
    private nav: NavController,
    private toastController: ToastController,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.user = new Login();

    this.storage.get("account").then((val) => { });
  }
  ionViewWillEnter() {
    this.storage.clear();
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
      this.presentToast(this.emptyInfo);
    } else {
      this.loginService.login(this.user).subscribe((response) => {
        if (response) {
          this.nav.navigateRoot(["student-list"]);
          this.storage.clear();
          this.user = response;
          this.storage.set("account", this.user);
        } else {
          this.presentToast(this.errorInfo);
        }
      });
    }
  }
}
