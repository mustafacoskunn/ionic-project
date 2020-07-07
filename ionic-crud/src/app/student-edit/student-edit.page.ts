import { Student } from "./../models/student";
import { ApiService } from "../services/student-crud.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: "app-student-edit",
  templateUrl: "./student-edit.page.html",
  styleUrls: ["./student-edit.page.scss"],
})
export class StudentEditPage implements OnInit {
  data: Student;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private apiservice: ApiService
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.data;
      }
    });
  }

  ngOnInit() { }

  update() {
    this.apiservice
      .updateItem(this.data.id, this.data)
      .subscribe((response) => {
        this.router.navigate(["student-list"]);
      });
  }
}
