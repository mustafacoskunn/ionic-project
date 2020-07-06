import { Injectable } from "@angular/core";
import { Student } from "../models/student";
import { retry, catchError } from "rxjs/operators";
import{HttpClient, HttpHeaders, HttpErrorResponse, HttpEvent} from '@angular/common/http'
import { throwError, Observable, from } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class ApiService {
  base_path = "http://127.0.0.1:8000/api/students";

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
  getList(id): Observable<Student> {
    return this.http
      .get<Student>(this.base_path+"/"+id)
  }

  updateItem(id, item): Observable<Student> {
   
    return this.http.post<Student>(
      this.base_path + "/" + id ,
      item
     
    );
    
  }
  deleteItem(id): Observable<Student> {
    return this.http.delete<Student>(this.base_path +"/?id="+ id);
  }
}
