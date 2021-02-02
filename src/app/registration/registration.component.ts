import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { RegistrationService } from './registration.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  email: string;
  password: string;

  constructor(private registrationService: RegistrationService,private router: Router,) { }

  ngOnInit(): void {
  }

  doReg(){
    this.registrationService.createUser(this.email,this.password).subscribe(data =>{
      console.log(data);
    },
    error => console.log(error));
    this.router.navigate(['/login']);
  }
  

}
