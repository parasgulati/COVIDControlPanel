import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
state='';
city='';
pincode='';
locality='';
district='';
result=[];
doc=[];
searchDisable=false;
  constructor(private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
  }
  search()
  {
    this.searchDisable=true;
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
        this.result=msg;
        this.searchDisable=false;
    });
  }
  
}
