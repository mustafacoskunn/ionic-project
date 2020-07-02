import { RecentMoviesService } from '../services/recent-movies.service';
import { from } from 'rxjs';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  moviesData: any;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 1.4, //item sayısı
  };
  constructor(public recentService:RecentMoviesService) {
    this.moviesData=[];
  
  }
  ngOnInit() {
    //lifecyle ilk çalışan
    this.getRecentMovies();

  }
  async getRecentMovies(){
    this.recentService.getMovies().subscribe(response=>{
      this.moviesData=response.results;
      for(var i=0;i<this.moviesData.length;i++){
        this.moviesData[i].poster_path="http://image.tmdb.org/t/p/w185/"+this.moviesData[i].poster_path;
      }
      
    })
  }
 
  

}
