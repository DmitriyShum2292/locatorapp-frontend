import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { User } from '../registration/user';
import { Coordinate } from './coordinate';
import { PersonalService } from './personal.service';
import { Trusted } from './trusted';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  coordinates: any[];
  user: User = new User();
  trustedUsers: Trusted[];
  usersITrust: Trusted[];
  email: string;

  constructor(private personalService: PersonalService,private loginService: LoginService,
              private router: Router) { }

  ngOnInit(): void {
    this.user = this.loginService.user;
    this.getMyCoordinate();
    this.getMyTrustedUsers();
    this.getUsersItrust();
    if(this.user.email==null){
      this.router.navigate(['/login']);
    }
  }

  private getMyCoordinate(){
    this.personalService.getMyCoordinate(this.user.email,this.user.password).subscribe(data =>{
      this.coordinates = data;
    });
  }
  private getMyTrustedUsers(){
    this.personalService.getMyTrustedUsers(this.user.email,this.user.password).subscribe(data =>{
      this.trustedUsers = data;
    });
  }
  private getUsersItrust(){
    this.personalService.getUsersITrust(this.user.email,this.user.password).subscribe(data =>{
      this.usersITrust = data;
    });
  }

  coordinateDetails(id: number){
    this.router.navigate(['details', id]);
  }
  addNewTrustedUser(){
    this.personalService.addNewTrustedUser(this.user.email,this.user.password,this.email).subscribe(data =>{
      console.log(data);
    },
    error => console.log(error));
  }
  deleteTrustedUser(id: number){
    let resp = this.personalService.deleteTrustedUser(this.user.email,this.user.password,id);
    resp.subscribe(data=>{
      console.log(data)
    });
  }

  reload(){
    this.getMyCoordinate();
    this.getMyTrustedUsers();
    this.getUsersItrust();
  }


  
}
