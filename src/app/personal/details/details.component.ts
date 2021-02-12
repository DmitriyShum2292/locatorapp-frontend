import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/registration/user';
import { Coordinate } from '../coordinate';
import { PersonalService } from '../personal.service';
import { DetailsService } from './details.service';
import { AgmMap } from '@agm/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  user: User = new User();
  coordinates: any[];
  id: number;
  coordinate: string;
  coord: Coordinate = new Coordinate();

  private map;
  latitude: number; 
  longitude: number;

  public agmMap: AgmMap;

  location(x){ 
    this.latitude=x.coords.lat; 
    this.longitude=x.coords.lng; 
  } 

  constructor(private service: PersonalService,private route: ActivatedRoute,
              private router: Router,private detailService: DetailsService) { }

  ngOnInit(): void { 
    this.id = this.route.snapshot.params['id'];
    this.user = this.service.user;
    this.getCoordinatesMyTrustedUser();
  }

  private getCoordinatesMyTrustedUser(){
    this.detailService.getCoordinates(this.user.email,this.user.password,this.id)
      .subscribe(data => {
        console.log(data)
        this.coordinates = data;
      }, error => console.log(error));
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

}
