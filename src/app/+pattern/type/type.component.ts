import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {DatalayerService} from '../../+services/datalayer.service';
import {urlService} from '../../+services/fetchdata.service';

@Component({
  moduleId: module.id,
  selector: 'app-type',
  templateUrl: 'type.component.html',
  styleUrls: ['type.component.css']
})
export class PatternTypeComponent implements OnInit {
  breadCrumbVal = 'product-page'
  urlMeta: any;
  typeUrlArray: any;
  type: string;
  errorMessage;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private _dataLayerService: DatalayerService,
    private _urlService: urlService) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.type = params['type'];
        console.info(this.type);
        this.createDataLayer(this.type);
        //this.getUrlMeta();
       // this.logToConsole();
      });

  }

//observable playground

getUrlMeta(){

    this._urlService.getUrlLog()
}

logToConsole(){
  console.info('urlMeta', this.urlMeta)
}

  createDataLayer(type) {
    console.info(JSON.stringify(this._urlService.createDataLayer(type),null, 4));
  }
}