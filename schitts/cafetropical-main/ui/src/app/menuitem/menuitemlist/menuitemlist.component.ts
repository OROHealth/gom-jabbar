import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Component({
  selector: 'app-menuitemlist',
  templateUrl: './menuitemlist.component.html',
  styleUrls: ['./menuitemlist.component.css']
})
export class MenuitemlistComponent implements OnInit {
  @Input() selectMode = false;
  @Output() selectedEvent = new EventEmitter();
  menuitemlist = [];
  private observable: Observable<any>;
  selectedmenuitem = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getMenuItemList().subscribe(response => {
      this.menuitemlist = response;
    });
  }
  getMenuItemList(){
    let httpOptions = { headers: new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json') };
    this.observable = this.http.get("http://localhost:3001/getMenuItemList", httpOptions).pipe(map((data ) => {
      console.log(data) 
      return data;
    }), catchError( error => {
      return throwError( 'Something went wrong!' );
    }))
    return this.observable;
  }
  selectMenuitem(menuitem){
    //this.selectedEvent = new EventEmitter();
  }
}
