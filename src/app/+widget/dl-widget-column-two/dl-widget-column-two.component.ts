import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-dl-widget-column-two',
  templateUrl: 'dl-widget-column-two.component.html',
  styleUrls: ['dl-widget-column-two.component.css']
})
export class DlWidgetColumnTwoComponent implements OnInit {
  // get the analytics vars from service.. this should be returned as an Object
  // 

  analyticVars: Object;
  labelType: Object;
  labelTypeTitle = 'DataLayer Property type';
  analyticsTrackTitle = 'Analytics Tracking';


  constructor() { }

  analyticsDebugger() {
    (function () {
      let dpwin = window.open('', 'dp_debugger', 'width=800,height=700,location=0,menubar=0,status=1,toolbar=0,resizable=1,scrollbars=1');
      dpwin.document.write('<script%20language="JavaScript"%20id="dbg"%20src="https://www.adobetag.com/d1/digitalpulsedebugger/live/DPD.js?auto_refresh=0"></script>');
      setTimeout('dpwin.document.close()', 3000);
    })();
  }

  ngOnInit() {
    this.analyticVars = {
      reportsuite: 'westpac-prd',
      experience: 'desktop',
      events: 'event1,13',
      evars: 'eVar14,15,30,list2',
      props: 'prop7,8',
      others: 'Products'

    }

    this.labelType = {
      isExtended: true,
      isContentManaged: true
    }

    //console.info('analyticVars', this.analyticVars)
  }

}
