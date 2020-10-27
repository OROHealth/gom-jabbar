import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cafetropical';
  panels = {
    'main': true,
    'neworder': false,
    'newmenuitem':false,
    'newcustomers':false,
    'orderlist':false,
    'menuitemlist':false,
    'customerlist':false
  }
  resetPanels(){
    for (const key in this.panels) {
      this.panels[key] = false;
    }
  }
  changePanel(panel){
    this.resetPanels();
    this.panels[panel] = true;
  }
}
