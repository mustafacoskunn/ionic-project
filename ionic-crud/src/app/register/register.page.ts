import { RegisterService } from "./../services/register.service";
import { Component, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage";
import {
  ToastController,
  AlertController,
  NavController,
} from "@ionic/angular";
import { Login } from "../models/login";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"],
})
export class RegisterPage implements OnInit {
  user: any;
  textAlreadyExist = "Böyle bir kullanıcı zaten var!";
  textNotEmpty = "Kullanıcı adı veya şifre boş bırakılamaz!";
  constructor(
    private registerService: RegisterService,
    private toastController: ToastController,
    private storage: Storage,
    private alertController: AlertController,
    private nav: NavController
  ) { }
  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }

  async presentAlertMultipleButtons() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Merhaba  " + this.user.name + " Hoşgeldin",
      subHeader:
        "Burada Kendi Öğrencilerini görebilir ve üzerinde değişiklikler yapabilirsin.",
      message: "Bu bir eğitim yönetim sistemidir.",
      buttons: ["Kapat"],
    });

    await alert.present();
  }

  ngOnInit() {
    this.user = new Login();
  }
  register() {
    if (this.user.email && this.user.password && this.user.name) {
      this.registerService.register(this.user).subscribe((response) => {
        if (response) {
          this.user = response;
          this.storage.set("account", this.user);
          this.presentAlertMultipleButtons();
          this.nav.navigateRoot(["student-list"]);
        } else this.presentToast(this.textAlreadyExist);
      });
    } else {
      this.presentToast(this.textNotEmpty);
    }
  }
}
