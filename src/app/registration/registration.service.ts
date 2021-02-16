import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from '../login.service';
import { User } from './user';


@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  regUrl: string = "http://185.139.70.180:8081/registration/new";
  user: User = new User();

  constructor(private http: HttpClient,private loginService: LoginService) { }

  createUser(email: string,password: string): Observable<Object>{
    this.user.email = email;
    this.user.password = password;
    return this.http.post("http://185.139.70.180:8081/registration/new",this.user,{responseType:'text' as 'json'});
  }
}
