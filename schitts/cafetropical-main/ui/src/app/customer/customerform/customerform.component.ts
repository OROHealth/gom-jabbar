import { Component, OnInit } from '@angular/core';

import { HttpClient,HttpHeaders   } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {  FormGroup, FormControl }  from "@angular/forms";
@Component({
  selector: 'app-customerform',
  templateUrl: './customerform.component.html',
  styleUrls: ['./customerform.component.css']
})
export class CustomerformComponent implements OnInit {
  public customerForm: FormGroup;

  private observable: Observable<any>;
  constructor(private http: HttpClient) {
    this.customerForm = new FormGroup({
      'name': new FormControl(),
      'prefereddrink': new FormControl(),
      'preferedfood': new FormControl(),
      'type': new FormControl()
    });

   }

  ngOnInit(): void {
  }
  onSubmit() {
    this.sendNewCustomerPostRequest().subscribe(response => {
    
    });
  }
  sendNewCustomerPostRequest(){
    let httpOptions = { headers: new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json') };
 
    let name = this.customerForm.get('name').value;
    let prefereddrink = this.customerForm.get('prefereddrink').value;
    let preferedfood = this.customerForm.get('preferedfood').value;
    let type =  this.customerForm.get('type').value;
    let body = JSON.stringify({
      name,
      prefereddrink,
      preferedfood,
      type 
    });
    this.observable = this.http.post('http://localhost:3001/newcustomer', body, httpOptions )
    .pipe(map((data ) => {
         return data;
       }), catchError( error => {
         return throwError( 'Something went wrong!' );
       }))
    return this.observable;
  }
}
