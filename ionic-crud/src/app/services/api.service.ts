import { Injectable } from "@angular/core";
import { Student } from "../models/student";
import { retry, catchError } from "rxjs/operators";
import{HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http'
import { throwError, Observable, from } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class ApiService {
  base_path = "http://localhost:3000/students";

  constructor(private http: HttpClient) {}


  handleError(error:HttpErrorResponse){
    if(error.error instanceof ErrorEvent)
      console.error("Veriler Getirelemedi.",error.error.message)
    else
      console.error("Body Kodu:");//
    return throwError('Hata!');
  }

  //yeni item oluştur
  createItem(item): Observable<Student> {
    return this.http.post<Student>(this.base_path, item);
  }
  //tek bir veriye ulaşma
  getItem(id): Observable<Student> {
    console.log("getİtem:"+id);
    return this.http.get<Student>(this.base_path + "/" + id);
  }
  getList(): Observable<Student> {
    return this.http
      .get<Student>(this.base_path)
  }

  updateItem(id, item): Observable<Student> {
   
    return this.http.put<Student>(
      this.base_path + "/" + id ,
      item
     
    );
    
  }
  deleteItem(id): Observable<Student> {
    return this.http.delete<Student>(this.base_path + "/" + id);
  }
}
