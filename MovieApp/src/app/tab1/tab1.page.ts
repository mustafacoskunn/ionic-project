import { RecentMoviesService } from "../services/recent-movies.service";
import { from } from "rxjs";
import { Component } from "@angular/core";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {
  moviesData: any; //boş array tanımladık
  slideOpts = {
    initialSlide: 0, //0. itemdan itibaren
    speed: 400, //animation hızı
    slidesPerView: 1.4, //item sayısı
  };
  constructor(public recentService: RecentMoviesService) {
    this.moviesData = []; //constructor
  }
  ngOnInit() {
    //lifecyle ilk çalışan
    this.getRecentMovies();
  }
  async getRecentMovies() { //async olması lazım yoksa patlayabilir
    this.recentService.getMovies().subscribe((response) => { //rxjs ile (recent movie servicenin getMovies())
      this.moviesData = response.results; //data geldiyse reponseyi results a at
      for (var i = 0; i < this.moviesData.length; i++) { //fotoğraflar path olarak verilmiş linke ekliyoruz
        this.moviesData[i].poster_path =
          "http://image.tmdb.org/t/p/w185/" + this.moviesData[i].poster_path;
      }
    });
  }
}
