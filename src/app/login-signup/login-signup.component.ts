import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent implements OnInit {
loginEmail='';
signupEmail='';
signupPassword='';
loginPassword='';
name='';
adminPassword='';
oldAdminPassword='';
newAdminPassword='';
adminMessage='';
signupMessage=''
loginMessage='';
logindisable=false;
signupdisable=false;
admindisable=false;
  constructor(private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
  }
  changeAdmin()
  {
    this.admindisable=true;
    var reqObj={
      oldAdminPassword:this.oldAdminPassword,
      newAdminPassword:this.newAdminPassword,
     };
    
    const headers=new HttpHeaders()
    .set('Authorization','my-auth-token')
    .set('Content-Type','application/json');
    this.http.post('https://quarantinecovid19.herokuapp.com/changeAdmin',JSON.stringify(reqObj),{headers:headers})
    .subscribe((msg:any)=>{
        if(msg["message"]=="changed")
        {
          this.adminMessage="Administrator Password Changed Successfully."
       }
       else
       {
        this.adminMessage="Old Admin. Password is wrong."
       }
       this.admindisable=false;
    });
  }
  login()
  {
    this.logindisable=true;

    var reqObj={
      email:this.loginEmail,
      password:this.loginPassword
     };
    const headers=new HttpHeaders()
    .set('Authorization','my-auth-token')
    .set('Content-Type','application/json');
    this.http.post('https://quarantinecovid19.herokuapp.com/ControlLogin',JSON.stringify(reqObj),{headers:headers})
    .subscribe((msg:any)=>{
        if(msg["message"]=="ok")
        {
          this.loginMessage="Logged in successfully."
          this.router.navigate(['/mainPage']);
       }
       else
       {
         if(msg["message"]=="wrong")
            this.loginMessage="either email or password is wrong";   
       }
       this.logindisable=false;
    
    });
  }
  
  signup()
  {
    this.signupdisable=true;
     var reqObj={
      name:this.name,
      email:this.signupEmail,
      password:this.signupPassword,
      adminPassword:this.adminPassword
     };
    const headers=new HttpHeaders()
    .set('Authorization','my-auth-token')
    .set('Content-Type','application/json');
    this.http.post('https://quarantinecovid19.herokuapp.com/ControlSignup',JSON.stringify(reqObj),{headers:headers})
    .subscribe((msg:any)=>{
        if(msg["message"]=="created")
        {
          this.signupMessage="Account Successfully Created."
       }
       else
       {
         if(msg["message"]=="exists")
            this.signupMessage="This email already exists." 
          else if(msg["message"]=="wrong")
                  this.signupMessage="Admin. Password is wrong";   
       }
       this.logindisable=false;
    
    });
  }
}
