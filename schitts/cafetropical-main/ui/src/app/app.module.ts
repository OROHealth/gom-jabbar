import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrderformComponent } from './order/orderform/orderform.component';
import { OrderlistComponent } from './order/orderlist/orderlist.component';
import { OrderviewComponent } from './order/orderview/orderview.component';
import { CustomerformComponent } from './customer/customerform/customerform.component';
import { CustomerviewComponent } from './customer/customerview/customerview.component';
import { CustomerlistComponent } from './customer/customerlist/customerlist.component';
import { MenuitemlistComponent } from './menuitem/menuitemlist/menuitemlist.component';
import { MenuitemviewComponent } from './menuitem/menuitemview/menuitemview.component';
import { MenuitemformComponent } from './menuitem/menuitemform/menuitemform.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    AppComponent,
    OrderformComponent,
    OrderlistComponent,
    OrderviewComponent,
    CustomerformComponent,
    CustomerviewComponent,
    CustomerlistComponent,
    MenuitemlistComponent,
    MenuitemviewComponent,
    MenuitemformComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
