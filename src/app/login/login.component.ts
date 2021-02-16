import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  response: any;

  constructor(private service: LoginService,private router: Router) { }

  ngOnInit(): void {
  }
  doLogin(){
    let resp = this.service.login(this.email,this.password);
    resp.subscribe(data=>{
      console.log(data)
      this.response = data;
      if(this.response == "Success"){
        this.router.navigate(['/personal']);
      }
    })
    this.response = "Error! Invalid username or password!";
  }
}
