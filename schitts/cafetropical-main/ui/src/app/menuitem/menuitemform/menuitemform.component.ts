import { Component, OnInit,Output,EventEmitter } from '@angular/core';

import { HttpClient,HttpHeaders   } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {  FormGroup, FormControl }  from "@angular/forms"; 
@Component({
  selector: 'app-menuitemform',
  templateUrl: './menuitemform.component.html',
  styleUrls: ['./menuitemform.component.css']
})
export class MenuitemformComponent implements OnInit {
  @Output() formfinishedevent = new EventEmitter();
  public menuitemForm: FormGroup;
  public expirationdate = {'year':'0000','month':'00','day':'00'};
  private observable: Observable<any>;
  constructor(private http: HttpClient) {
    this.menuitemForm = new FormGroup({
      'name': new FormControl(),
      'price': new FormControl(),
      'overcookness': new FormControl(),
      'type': new FormControl()
    });

   }

  ngOnInit(): void {
  }
  onSubmit(){ 
    this.sendForm().subscribe(response => {
      this.formfinishedevent.emit({})
    });
  }
  sendForm(){
    let httpOptions = { headers: new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json') };
 
    let name = this.menuitemForm.get('name').value;
    let price = this.menuitemForm.get('price').value;
    let overcookness = this.menuitemForm.get('overcookness').value;
    let type = this.menuitemForm.get('type').value; 
    let expirationdate= this.expirationdate;
    let body = JSON.stringify({
      name,
      price,
      overcookness,
      type,
      expirationdate 
    });
    this.observable = this.http.post('http://localhost:3001/newmenuitem', body, httpOptions )
    .pipe(map((data ) => {
         return data;
       }), catchError( error => {
         return throwError( 'Something went wrong!' );
       }))
    return this.observable;
  }
  onDateSelect($event){
    console.log($event)
    this.expirationdate = $event;
  }
}
