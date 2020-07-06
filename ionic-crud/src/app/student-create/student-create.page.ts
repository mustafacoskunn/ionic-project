import { Storage } from '@ionic/storage';
import { Router } from "@angular/router";
import { ApiService } from "./../services/api.service";
import { Student } from "./../models/student";
import { Component, OnInit } from "@angular/core";
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: "app-student-create",
  templateUrl: "./student-create.page.html",
  styleUrls: ["./student-create.page.scss"],
})
export class StudentCreatePage implements OnInit {
  data: any;
  constructor(private apiService: ApiService, 
    public router: Router,
    private toastController:ToastController,
    private storage:Storage,


    ) 
    {
    this.data=[];
    this.data = new Student();
  }


  userController(){
  
    
    this.storage.get('id').then((val) => {
    this.data.created_id=val;
    console.log(this.data.created_id);
     
    })
   // .catch(error=>console.log(error))
    ;
  
  }

  ngOnInit() {
    this.userController();
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'İsim veya Yaş Boş bırakılamaz',
      duration: 2000
    });
    toast.present();
  }
  createStudent() {
    
    if(!this.data.name||!this.data.age){
      this.presentToast();

    }else{
  
    this.apiService.createItem(this.data).subscribe((response) => {
     
      this.router.navigate(['student-list']);

    });
  }
  }
}
