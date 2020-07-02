import { Injectable } from '@angular/core';
import {Results} from '../models/movie'
import{HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http'
import { throwError, Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecentMoviesService { //api servisi

  base_path="https://api.themoviedb.org/3/movie/now_playing?api_key=b52051d5c5721e0718600f4c3ffd04e3&language=tr"; //api servisi
  constructor(private http:HttpClient) { }

  handleError(error:HttpErrorResponse){
    if(error.error instanceof ErrorEvent)
      console.error("Veriler Getirelemedi.",error.error.message)
    else
      console.error("Body Kodu:");//
    return throwError('Hata!');
  }

  getMovies(): Observable<Results>{ //rxjs observable
    
    return this.http.get<Results>(this.base_path) 

  }
  
}
