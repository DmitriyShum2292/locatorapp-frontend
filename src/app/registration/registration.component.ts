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
  response: any;

  constructor(private registrationService: RegistrationService,private router: Router,) { }

  ngOnInit(): void {
  }

  doReg(){
    let resp = this.registrationService.createUser(this.email,this.password);
    resp.subscribe(data =>{
      console.log(data)
      this.response = data;
      if(this.response == "Success"){
        this.router.navigate(['/login']);
      }
    })
  }
  

}
