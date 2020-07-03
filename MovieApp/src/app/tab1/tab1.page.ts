import { PopulerMoviesService } from "./../services/populer-movies.service";
import { GenreServiceService } from "./../services/genre-service.service";
import { RecentMoviesService } from "../services/recent-movies.service";
import { from } from "rxjs";
import { Component } from "@angular/core";
import { NavigationExtras,Router } from '@angular/router';

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {
  moviesData: any; //boş array tanımladık
  genresData: any;
  populerMoviesData: any;
  slideOpts = {
    initialSlide: 0, //0. itemdan itibaren
    speed: 400, //animation hızı
    slidesPerView: 1.3, //item sayısı
  };
 
  constructor(
    public recentService: RecentMoviesService,
    public genreService: GenreServiceService,
    public populerService: PopulerMoviesService,
    private router:Router,
  ) {
    this.moviesData = []; //constructor
    this.genresData = [];
    this.populerMoviesData = [];
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
          "http://image.tmdb.org/t/p/w300/" + this.moviesData[i].poster_path;
        var genres = "";
        for (var j = 0; j < this.moviesData[i].genre_ids.length; j++) {
          //anlamadım
          var index = this.genresData.findIndex(
            (x) => x.id == this.moviesData[i].genre_ids[j]
          );
          if (index != -1) genres += this.genresData[index].name + ",";
        }
        genres = genres.substring(0, genres.length - 1);
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
      this.getPopulerMovies();
    });
  }
  async getPopulerMovies() {
    //async olması lazım yoksa patlayabilir
    this.populerService.getPopularMovies().subscribe((response) => {
      //rxjs ile (recent movie servicenin getMovies())
      this.populerMoviesData = response.results; //data geldiyse reponseyi results a at
      

      for (var i = 0; i < this.populerMoviesData.length; i++) {
        //fotoğraflar path olarak verilmiş linke ekliyoruz
        this.populerMoviesData[i].poster_path =
          "http://image.tmdb.org/t/p/w500/" +
          this.populerMoviesData[i].poster_path;
        var genres = "";
        for (var j = 0; j < this.populerMoviesData[i].genre_ids.length; j++) {
          //anlamadım
          var index = this.genresData.findIndex(
            (x) => x.id == this.populerMoviesData[i].genre_ids[j]
          );
          if (index != -1) genres += this.genresData[index].name + ",";
        }
        genres = genres.substring(0, genres.length - 1);
        this.populerMoviesData[i].genres = genres;
      }
    });
  }
  openDetail(movie:any){
    let navigationExtras:NavigationExtras={
      state:{
       movie:movie
      }
      
    };
    console.log(movie);
    this.router.navigate(['detail-page'],navigationExtras)
 
  }

}
