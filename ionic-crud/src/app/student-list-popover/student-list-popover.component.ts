import { ApiService } from './../services/api.service';
import { PopoverController, NavParams } from "@ionic/angular";
import { Component, OnInit } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";

@Component({
  selector: "app-student-list-popover",
  templateUrl: "./student-list-popover.component.html",
  styleUrls: ["./student-list-popover.component.scss"],
})
export class StudentListPopoverComponent implements OnInit {
 
  item:any;
  constructor(
    private router: Router,
    private popOverController: PopoverController,
    public navParams: NavParams,
    private apiService:ApiService
  ) {
     this.item = this.navParams.get("data");

  }

  ngOnInit() {}
  deleteData(id) {
    this.popOverController.dismiss();
    this.item.id = id;
    console.log(this.item.id);
    this.apiService.deleteItem(this.item.id).subscribe((response) => {
      console.log(response);
      this.router.navigate(['student-list']);
      //student-list oninit olmalı
    });
  }
  studentEdit(item) {
    console.log(item);
    let navigationExtras: NavigationExtras = {
      state: {
        data: item,
      },
    };

    this.popOverController.dismiss();
    this.router.navigate(["student-edit"], navigationExtras);
  }

}
