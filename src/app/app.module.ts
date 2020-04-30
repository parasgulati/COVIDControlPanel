import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PatientsComponent } from './patients/patients.component';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PatientNotQuarantineComponent } from './patient-not-quarantine/patient-not-quarantine.component';
import { MainComponent } from './main/main.component';
import { LoginSignupComponent } from './login-signup/login-signup.component';

const appRoutes:Routes =[
  {
    path:'mainPage',
    component:MainComponent,
    children:[{
      path:'search',
      component:SearchComponent
    },
    {
      path:'patients',
      component:PatientsComponent
    },
    {
      path:'notQuarantine',
      component:PatientNotQuarantineComponent
    }]
  },
  {
    path:'loginSignup',
    component:LoginSignupComponent
  },
  {
    path:"**",
    redirectTo:'/loginSignup'
  }
]

@NgModule({
  declarations: [
    AppComponent,
    PatientsComponent,
    SearchComponent,
    PatientNotQuarantineComponent,
    MainComponent,
    LoginSignupComponent
  ],
  imports: [
    
    HttpClientModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
