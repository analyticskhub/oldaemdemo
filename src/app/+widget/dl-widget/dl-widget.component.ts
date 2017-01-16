import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-dl-widget',
  templateUrl: 'dl-widget.component.html',
  styleUrls: ['dl-widget.component.css']
})
export class DlWidgetComponent implements OnInit {
 contextUrl = "http://www.westpac.com.au/personal-banking/credit-cards/low-fee/55-day/personal-banking/credit-cards/low-fee/55-day";
  constructor() { }

  ngOnInit() {
  }

}
