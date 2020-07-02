import { GenreServiceService } from "./../services/genre-service.service";
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
  genresData: any;
  slideOpts = {
    initialSlide: 0, //0. itemdan itibaren
    speed: 400, //animation hızı
    slidesPerView: 1.4, //item sayısı
  };
  constructor(
    public recentService: RecentMoviesService,
    public genreService: GenreServiceService
  ) {
    this.moviesData = []; //constructor
    this.genresData = [];
  }
  ngOnInit() {
    //lifecyle ilk çalışan
    this.getGenres();
  }
  async getRecentMovies() {
    //async olması lazım yoksa patlayabilir
    this.recentService.getMovies().subscribe((response) => {
      //rxjs ile (recent movie servicenin getMovies())
      this.moviesData = response.results; //data geldiyse reponseyi results a at

      for (var i = 0; i < this.moviesData.length; i++) {
        //fotoğraflar path olarak verilmiş linke ekliyoruz
        this.moviesData[i].poster_path =
          "http://image.tmdb.org/t/p/w500/" + this.moviesData[i].poster_path;
        var genres = "";
        for (var j = 0; j < this.moviesData[i].genre_ids.length; j++) { //anlamadım
          var index = this.genresData.findIndex(
            (x) => x.id == this.moviesData[i].genre_ids[j]
          );
          if (index != -1) genres += this.genresData[index].name + ",";
        }
        genres=genres.substring(0,genres.length-1)
        this.moviesData[i].genres = genres;
      }
    });
  }
  async getGenres() {
    //async olması lazım yoksa patlayabilir
    this.genreService.getGenres().subscribe((response) => {
      //rxjs ile (recent movie servicenin getMovies())
      this.genresData = response.genres; //data geldiyse reponseyi results a at
      this.getRecentMovies();
    });
  }
}
