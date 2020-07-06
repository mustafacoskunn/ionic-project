import { Storage } from "@ionic/storage";
import { Router } from "@angular/router";
import { ApiService } from "../services/student-crud.service";
import { Student } from "./../models/student";
import { Component, OnInit } from "@angular/core";
import { ToastController, AlertController } from "@ionic/angular";

@Component({
  selector: "app-student-create",
  templateUrl: "./student-create.page.html",
  styleUrls: ["./student-create.page.scss"],
})
export class StudentCreatePage implements OnInit {
  data: any;
  accountData: any;
  messageInfo = "İsim veya Yaş Boş bırakılamaz.";
  constructor(
    private apiService: ApiService,
    public router: Router,
    private toastController: ToastController,
    private storage: Storage
  ) {
    this.data = new Student();
    this.storage.get("account").then((val) => {
      this.accountData = val;
      this.data.created_id = this.accountData.id;
    });
  }

  ngOnInit() {}
  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }
  createStudent() {
    if (!this.data.name || !this.data.age) {
      this.presentToast(this.messageInfo);
    } else {
      this.apiService.createItem(this.data).subscribe((response) => {
        this.router.navigate(["student-list"]);
      });
    }
  }
}
