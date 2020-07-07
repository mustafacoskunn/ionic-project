import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
} from "@angular/common/http";
import { throwError, Observable } from "rxjs";
import { Login } from "../models/login";

@Injectable({
  providedIn: "root",
})
export class RegisterService {
  constructor(private http: HttpClient) { }
  base_path = "http://192.168.1.31:8080/api/register/";

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent)
      console.error("Veriler Getirelemedi.", error.error.message);
    else console.error("Body Kodu:"); //
    return throwError("Hata!");
  }
  register(user): Observable<Login> {
    return this.http.post<Login>(this.base_path, user);
  }
}
