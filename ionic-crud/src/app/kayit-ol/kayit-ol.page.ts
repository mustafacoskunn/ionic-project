import { ToastController, AlertController } from "@ionic/angular";
import { Router } from "@angular/router";
import { KayitOlService } from "./../services/kayit-ol.service";
import { Login } from "./../models/login";
import { Component, OnInit } from "@angular/core";
import { Storage } from '@ionic/storage';

@Component({
  selector: "app-kayit-ol",
  templateUrl: "./kayit-ol.page.html",
  styleUrls: ["./kayit-ol.page.scss"],
})
export class KayitOlPage implements OnInit {
  user: any;
  constructor(
    private kayitOlApi: KayitOlService,
    private router: Router,
    private toastController: ToastController,
    private storage:Storage,
    private alertController:AlertController,
  ) {}
  async hatapresentToast() {
    const toast = await this.toastController.create({
      message: "Böyle bir kullanıcı zaten var!",
      duration: 2000,
    });
    toast.present();
  }
  async bosPresentToast() {
    console.log("toast");
    const toast = await this.toastController.create({
      message: "Kullanıcı adı veya şifre boş bırakılamaz!",
      duration: 2000,
    });
    toast.present();
  }
  async presentAlertMultipleButtons() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Merhaba '+this.user.name+" Hoşgeldin",
      subHeader: 'Burada Kendi Öğrencilerini görebilir ve üzerinde değişiklikler yapabilirsin.',
      message: 'Bu bir eğitim yönetim sistemidir.',
      buttons: ['Kapat']
    });

    await alert.present();
  }
  ngOnInit() {
    this.user = new Login();
  }
  kayitOl() {
    if (this.user.email  &&this.user.password && this.user.name) {
      this.kayitOlApi.register(this.user).subscribe((response) => {
       
        if (response) {
          this.storage.clear();
          this.user=response;
          this.storage.set('id', this.user.id);
          this.storage.set('name',this.user.name);
          this.presentAlertMultipleButtons();
          this.router.navigate(["student-list"]);
        } else this.hatapresentToast();
      });
    } else {
      this.bosPresentToast();
    }
   
  }
}
