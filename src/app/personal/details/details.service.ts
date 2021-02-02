import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/registration/user';
import { Coordinate } from '../coordinate';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  user: User = new User();
  private url = "http://localhost:8080/personal/trustedusers";

  constructor(private http: HttpClient) { }

  getCoordinates(email: string,password: string,id: number){
    this.user.email = email;
    this.user.password = password;
    const headers = new HttpHeaders({Authorization:'Basic ' + btoa(email+":"+password)});
    return this.http.get<Coordinate[]>(`${this.url}/${id}`,{headers});
  }
}
