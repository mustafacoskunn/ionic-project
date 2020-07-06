import { Storage } from '@ionic/storage';
import { ToastController } from "@ionic/angular";
import { Router } from "@angular/router";
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
  constructor(
    private loginService: LoginServiceService,
    private router: Router,
    private toastController: ToastController,
    private storage:Storage
  ) {}

  

  ngOnInit() {
    this.user = new Login();
    this.storage.clear();
  }
  async bospresentToast() {
    const toast = await this.toastController.create({
      message: "Kullanıcı adı veya şifre boş bırakılamaz.",
      duration: 2000,
    });
    toast.present();
  }
  async hatapresentToast() {
    const toast = await this.toastController.create({
      message: "Kullanıcı adı veya şifre hatalı.",
      duration: 2000,
    });
    toast.present();
  }

  userEkle() {
    if (!this.user.email || !this.user.password) {
      this.bospresentToast();
    } else {
      this.loginService.login(this.user).subscribe((response) => {
        if (response) {
          this.storage.clear();
          this.user=response;
   
          this.storage.set('id', this.user.id);
          this.storage.set('name',this.user.name);
          console.log(this.user.name);
          this.router.navigate(["student-list"]);
        } else {
          this.hatapresentToast();
        }
      });
    }
  }
}
