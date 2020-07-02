import { Injectable } from '@angular/core';
import {Results} from '../models/movie'
import{HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http'
import { throwError, Observable, from } from 'rxjs';
import{retry,catchError} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class RecentMoviesService { //api servisi

  base_path="https://api.themoviedb.org/3/movie/popular?api_key=b52051d5c5721e0718600f4c3ffd04e3";
  constructor(private http:HttpClient) { }
  httpOptions={
    headers: new HttpHeaders({
      'Content-Type':'applicatiion/json'
    })
  }

  handleError(error:HttpErrorResponse){
    if(error.error instanceof ErrorEvent)
      console.error("Veriler Getirelemedi.",error.error.message)
    else
      console.error("Body Kodu:");//
    return throwError('Hata!');
  }

  getMovies(): Observable<Results>{ //rxjs observable
    
    return this.http.get<Results>(this.base_path).pipe(retry(2),catchError(this.handleError)) //Observable operatörleri

  }
  
}
