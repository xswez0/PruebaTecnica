import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  readonly userAPIUrl = "https://localhost:7245/api";

  constructor(private http:HttpClient) { }

  getUserList():Observable<any[]>{
    return this.http.get<any>(this.userAPIUrl + '/Users');
  }

  addUser(data:any) {
    return this.http.post(this.userAPIUrl + '/Users', data);
  }

  updateUser(id:number|string, data:any){
    return this.http.put(this.userAPIUrl + `/Users/${id}`, data);
  }

  deleteUser(id:number|string){
    return this.http.delete(this.userAPIUrl + `/Users/${id}`);
  }
}
