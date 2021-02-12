import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Coordinate } from './coordinate';
import { Observable } from 'rxjs';
import { Trusted } from './trusted';
import { User } from '../registration/user';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  user: User = new User();

  constructor(private http: HttpClient) { }

  getMyCoordinate(email: string,password: string): Observable <Coordinate[]>{
    this.user.email = email;
    this.user.password = password;
    const headers = new HttpHeaders({Authorization:'Basic ' + btoa(email+":"+password)});
    return this.http.get<Coordinate[]>("http://185.139.70.180:8081/personal/my",{headers});
  }
  getMyTrustedUsers(email: string,password: string){
    const headers = new HttpHeaders({Authorization:'Basic ' + btoa(email+":"+password)});
    return this.http.get<Trusted[]>("http://185.139.70.180:8081/personal/trustedusers",{headers});
  }
  getUsersITrust(email: string, password: string){
    const headers = new HttpHeaders({Authorization:'Basic ' + btoa(email+":"+password)});
    return this.http.get<Trusted[]>("http://185.139.70.180:8081/personal/trustedusers/itrust",{headers});
  }
  addNewTrustedUser(email: string,password: string,trustedUser: string){
    const headers = new HttpHeaders({Authorization:'Basic ' + btoa(email+":"+password)});
    return this.http.post("http://185.139.70.180:8081/personal/addtrusted",trustedUser,{headers});
  }
  deleteTrustedUser(email: string, password: string,id: number){
    const headers = new HttpHeaders({Authorization:'Basic ' + btoa(email+":"+password)});
     return this.http.get("http://185.139.70.180:8081/personal/trustedusers/delete/"+id,{headers,responseType:'text' as 'json'});
  }
  
}
