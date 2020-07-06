import { Login } from "./../models/login";
import { throwError, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHeaders,
} from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class LoginServiceService {
  base_path = "http://127.0.0.1:8000/api/login/";
  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent)
      console.error("Veriler Getirelemedi.", error.error.message);
    else console.error("Body Kodu:"); //
    return throwError("Hata!");
  }

  login(user): Observable<Login> {
    return this.http.post<Login>(this.base_path, user, this.httpOptions);
  }
}