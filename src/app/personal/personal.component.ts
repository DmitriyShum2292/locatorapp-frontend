import { Component, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { User } from '../registration/user';
import { Coordinate } from './coordinate';
import { PersonalService } from './personal.service';
import { Trusted } from './trusted';
import { AgmMap } from '@agm/core';
import * as L from 'leaflet';


@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  coordinates: Coordinate[];
  user: User = new User();
  trustedUsers: Trusted[];
  usersITrust: Trusted[];
  email: string;
  coordinate: string;
  private map;
  latitude: number; 
  longitude: number; 
  
public agmMap: AgmMap;

  location(x){ 
    this.latitude=x.coords.lat; 
    this.longitude=x.coords.lng; 
  } 

  constructor(private personalService: PersonalService,private loginService: LoginService,
              private router: Router) { }

  ngOnInit(): void {
    this.initMap();
    this.tiles.addTo(this.map);

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
      this.latitude = this.coordinates[0].lat;
    this.longitude = this.coordinates[0].lon;
    });
  
    
  }
  ngAfterViewInit(): void {
  }

  private getMyTrustedUsers(){
    this.personalService.getMyTrustedUsers(this.user.email,this.user.password).subscribe(data =>{
      this.trustedUsers = data;
    });
  }
   getUsersItrust(){
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
    this.getUsersItrust();
  }
  deleteTrustedUser(id: number){
    let resp = this.personalService.deleteTrustedUser(this.user.email,this.user.password,id);
    resp.subscribe(data=>{
      console.log(data)
    });
    this.getUsersItrust();
  }
  reload(){
    this.getMyCoordinate();
    this.getUsersItrust();
    this.getMyTrustedUsers();
  }
  goGoogle(coordinate: Coordinate):void{
    this.coordinate = "https://maps.google.com?saddr=Current+Location&daddr="+coordinate.lat+","+coordinate.lon;
    //window.location.href = this.coordinate;
    window.open(this.coordinate, "_blank");
    this.latitude = coordinate.lat;
    this.longitude = coordinate.lon;
  }
  go(coordinate: Coordinate):void{
    this.latitude = coordinate.lat;
    this.longitude = coordinate.lon;
  }
  private initMap(): void {
  this.map = L.map('map', {
    center: [ 39.8282, -98.5795 ],
    zoom: 3
  });
}
  tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  });

}
