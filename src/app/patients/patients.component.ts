import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
username='';
result=[];
patientDisable=false;
  constructor(private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
  }
  search()
  {
    this.patientDisable=true;
    var req={
      username:this.username
    };
    const headers=new HttpHeaders()
    .set('Authorization','my-auth-token')
    .set('Content-Type','application/json');
    this.http.post('https://quarantinecovid19.herokuapp.com/PatientUpdates',JSON.stringify(req),{headers:headers})
    .subscribe((msg:any)=>{
      this.result=msg;
      this.patientDisable=false;
    });
  }
}
