import { ApiService } from "./../services/api.service";
import { Component, OnInit } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";

@Component({
  selector: "app-student-list",
  templateUrl: "./student-list.page.html",
  styleUrls: ["./student-list.page.scss"],
})
export class StudentListPage implements OnInit {
  studentData: any;
  constructor(public apiService: ApiService, public router: Router) {
    this.studentData = [];
  }

  
 
  ionViewWillEnter(){
    this.getAllStudents();
    console.log("ionViewWillEnter");
  }

  

  getAllStudents() {
    this.apiService.getList().subscribe((response) => {
      this.studentData = response;
    });
  }
  deleteData(item) {
    this.apiService.deleteItem(item).subscribe((response) => {
      console.log(response);
      this.getAllStudents();
    });
  }
  studentEdit(item) {
    let navigationExtras: NavigationExtras = {
      state: {
        data: item,
      },
    };

    this.router.navigate(['student-edit'], navigationExtras);
  }
}
