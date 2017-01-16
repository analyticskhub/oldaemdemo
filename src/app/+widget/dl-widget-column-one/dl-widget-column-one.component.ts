import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-dl-widget-column-one',
  templateUrl: 'dl-widget-column-one.component.html',
  styleUrls: ['dl-widget-column-one.component.css']
})
export class DlWidgetColumnOneComponent implements OnInit {

// need the service here to update dataLayer
// a function to stringify the dataLayer 
// onInit required? 
// footer links also dynamic? 

icon = 'fa-code fa-fw';
title = 'Data layer object';
stringifyData:any;
digitalData = {

      "dLayerVer": "1.0",
      "siteDomain": "www.westpac.com.au",
      "siteVersion": "aem.1.332.2",
      "siteSection": "personal-banking",
      "siteSubSection": "personal-loans",
      "siteSubSubSection": "compare",
      "siteBrand": "wbc",
      "siteName": "wbc:www",
      "siteEnv": "prod",
      "pageType": "product",
      "pageStep": "comparison",
      "productID": [
        {
          "prod": "6f727ab181234f1b8a80aff0dbfadc7c",
          "family": "personal",
          "category": "credit-cards",
          "subcategory": "",
          "name": "low-rate"
        },
        {
          "prod": "0731a59f183447b6b50a17caae4663b1",
          "family": "personal",
          "category": "credit-cards",
          "subcategory": "low-fee",
          "name": "55-day-platinum"
        }
      ]
    }

  constructor() { }

  ngOnInit() {
    this.stringifyData = JSON.stringify(this.digitalData, null, 4);
  }

}
