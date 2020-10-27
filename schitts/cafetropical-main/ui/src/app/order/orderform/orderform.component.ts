import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orderform',
  templateUrl: './orderform.component.html',
  styleUrls: ['./orderform.component.css']
})
export class OrderformComponent implements OnInit {
  panels = {'customer':true,
            'menuitem':false,
            'confirm':false}
  constructor() { }

  ngOnInit(): void {
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
