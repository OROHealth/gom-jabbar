import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';

import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Component({
  selector: 'app-customerlist',
  templateUrl: './customerlist.component.html',
  styleUrls: ['./customerlist.component.css']
})
export class CustomerlistComponent implements OnInit {
  @Input() selectMode = false;
  @Output() selectedEvent = new EventEmitter();
  private observable: Observable<any>;
  customerlist = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getCustomerList().subscribe(response => {
      this.customerlist = response;
    });
  }
  getCustomerList(){
    let httpOptions = { headers: new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json') };
    this.observable = this.http.get("http://localhost:3001/getCustomerList", httpOptions).pipe(map((data ) => {
    console.log(data) 
    return data;
    }), catchError( error => {
      return throwError( 'Something went wrong!' );
    }))
    return this.observable;
  }
}
