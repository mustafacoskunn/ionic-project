import { Genres } from './../models/genre';
import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { throwError, Observable, from } from "rxjs";


@Injectable({
  providedIn: "root",
})
export class GenreServiceService {
  //api servisi

  base_path =
    "https://api.themoviedb.org/3/genre/movie/list?api_key=b52051d5c5721e0718600f4c3ffd04e3&language=tr"; //api servisi
  constructor(private http: HttpClient) {}

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent)
      console.error("Veriler Getirelemedi.", error.error.message);
    else console.error("Body Kodu:"); //
    return throwError("Hata!");
  }

  getGenres(): Observable<Genres> {


    return this.http.get<Genres>(this.base_path);
  }
}
