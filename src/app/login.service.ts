import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './registration/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user: User = new User();

  constructor(private http:HttpClient) { 
  
  }

  public login (email: string,password: string){
    this.user.email=email;
    this.user.password=password;
    const headers = new HttpHeaders({Authorization:'Basic ' + btoa(email+":"+password)});
     return this.http.get("http://localhost:8080/registration/login",{headers,responseType:'text' as 'json'});
  }
}
