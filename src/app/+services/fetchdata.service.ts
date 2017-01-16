import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/map';

export interface urlType {
  type: string;
  url: string;
}

interface locationObj {
  href: string;
  protocol: string;
  hostname: string;
  pathname: string;
  search: string;
  hash: string;
}

interface siteVars {
  site_brand?: string;
  site_name?: string;
  site_env?: string;
  site_section?: string;
  dLayerVer?: string;
  site_domain?: string;
  site_version?: string;
  site_family?: string;
  site_subsection?: string;
  site_subsubsection?: string;

}

interface contLoc {
  location: Object;
}

interface prodArray {
  id?: string,
  family?: string,
  category?: string,
  subcategory?: string,
  name?: string,
  url?: string
}


@Injectable()
export class urlService {
  constructor(private _http: Http) { }

  urlMeta;
  dataLayer: Object = {
    'mockUpVersion': '0.1'
  };
  patternType: string;
  typeUrlArray: any;
  contextUrl: string;
  commonVars: any;

  getUrlLog() {
    this._http.get('app/assets/data/url.json?cache=' + (Math.random() * 1000000))
      .map((res) => res.json())
      .subscribe(
      data => { this.urlMeta = data },
      err => console.error(err),
      () => console.info('step:1:JSON-url-log-fetched-STARTofSERVICE')
      );
  }

  getRandomLink(type) {
    console.info(this.urlMeta);
    let defaultType = this.urlMeta.filter((t: urlType) => t.type === type);
    let randomLink;
    randomLink = defaultType[Math.floor(Math.random() * defaultType.length)];
    this.contextUrl = randomLink.url;
    console.info('randomLink', randomLink);
    console.info('contextURL', this.contextUrl);
    console.info('step:2:Random-url-generated-by-type')
    return this.contextUrl

  }
  setCommonVars(url: string) {
    let el: HTMLAnchorElement,
      isWestpac: boolean,
      isProd: boolean,
      sectionArray: string[],
      contextLoc: contLoc,
      siteVars: siteVars = {
        'dLayerVer': '1.0'
      },
      pseudoLoc: locationObj;

    el = document.createElement('a');
    el.href = url;
    console.info('el.href', el.href);
    pseudoLoc = {
      href: el.href,
      protocol: el.protocol,
      hostname: el.hostname,
      pathname: el.pathname,
      search: el.search,
      hash: el.hash
    };

    contextLoc = {
      location: pseudoLoc
    }

    // update window variable for s_code
    //window.testTracking = contextLoc;
    // update the s_code test object to use contextURl
    //window.s.w_wtT = contextLoc;
    // set prod, host and domain info
    isWestpac = /westpac/i.test(pseudoLoc.hostname);
    isProd = /www.westpac.com.au/i.test(pseudoLoc.hostname);
    if (isWestpac) {
      siteVars.site_brand = 'wbc';
      siteVars.site_name = 'wbc:www';
    }
    if (isProd) {
      siteVars.site_env = 'prod';
    } else {
      siteVars.site_env = 'dev';
    }

    sectionArray = pseudoLoc.pathname.split('/');
    // set details from path
    siteVars.site_domain = pseudoLoc.hostname;
    siteVars.site_version = 'aem.1.332.2';
    siteVars.site_family = sectionArray[1];
    if (sectionArray[2]) {
      siteVars.site_section = sectionArray[2];
    }
    if (sectionArray[3]) {
      siteVars.site_subsection = sectionArray[3];
    }
    if (sectionArray[4]) {
      siteVars.site_subsubsection = sectionArray[4];
    }
    console.info('step:3:common-sitevars-created')
    return siteVars;

  }

  //createDataLayer called in component 
  createDataLayer(ptype) {
    this.patternType = ptype;

    switch (this.patternType) {

      case 'faqpage':
        let appendToDataLayer;
        this.getUrlLog();
        this.getRandomLink(this.patternType);
        this.commonVars = this.setCommonVars(this.contextUrl);

        //merge all data to creat the finalDataLayer
        appendToDataLayer = Object.assign({}, this.commonVars);
        this.dataLayer = Object.assign(this.dataLayer, appendToDataLayer);
        console.info('step:4:Final-datalayer-returned-to-component-ENDofSERVICE')
        //TODO
        break;
    }
    return this.dataLayer;
  }
}

