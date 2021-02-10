import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegistrationComponent } from './registration/registration.component';
import { PersonalComponent } from './personal/personal.component';
import { DetailsComponent } from './personal/details/details.component';
import { AboutComponent } from './about/about.component';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    PersonalComponent,
    DetailsComponent,
    AboutComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    AgmCoreModule.forRoot({
      apiKey:"AIzaSyAGOJVa3ocsbABNEi2ohTto5h28RRxE2xY"
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
