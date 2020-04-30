import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router';
@Component({
  selector: 'app-patient-not-quarantine',
  templateUrl: './patient-not-quarantine.component.html',
  styleUrls: ['./patient-not-quarantine.component.css']
})
export class PatientNotQuarantineComponent implements OnInit {
state='';
city='';
locality='';
pincode='';
district='';
result=[];
doc=[];
patientDisable=false;
constructor(private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
  }

   
  search()
  {
    this.patientDisable=true;
    var reqObj={
      state:this.state,
      city:this.city,
      pincode:this.pincode,
      locality:this.locality,
      district:this.district
    }
    
    const headers=new HttpHeaders()
    .set('Authorization','my-auth-token')
    .set('Content-Type','application/json');
    
    this.http.post('https://quarantinecovid19.herokuapp.com/searchPatients',JSON.stringify(reqObj),{headers:headers})
    .subscribe((msg:any)=>{
        this.doc=msg;
        for(var i=0;i<this.doc.length;i++)
        {
          this.result.push({"username":this.doc[i].username,"quarantine":"no"});
        }
        var req={
          'array':this.result
        }
        this.http.post('https://quarantinecovid19.herokuapp.com/NotQuarantinePatient',JSON.stringify(req),{headers:headers})
        .subscribe((msg:any)=>{
          this.result=msg;
            this.patientDisable=false;
        });
    });
  }
}
