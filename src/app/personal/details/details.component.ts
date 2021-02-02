import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/registration/user';
import { Coordinate } from '../coordinate';
import { PersonalService } from '../personal.service';
import { DetailsService } from './details.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  user: User = new User();
  coordinates: any[];
  id: number;

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

}
