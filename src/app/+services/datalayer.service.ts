import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
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

@Injectable()
export class DatalayerService {
  dataLayer: Object = {
    'mockUpVersion': '0.1'
  };
  patternType: string;
  typeUrlArray: any;
  contextUrl: string;
  constructor(private _http: Http) { }

  //methods
  loadUrlMeta() {
    // added timestamp so that it does not load from cache! 
    // okay if it loads from cache since it's static file, timestamp makse sense if data changes i.e POST happens to json file'
    return this._http.get('app/assets/data/url.json?cache=' + (Math.random() * 1000000))
      .map((response) => response.json());
  }

  getUrlByType(type: string) {
    return this._http.get('app/assets/data/url.json?cache=' + (Math.random() * 1000000))
      //.map((response) => response.json().filter((t: urlType) => t.type === type));
      .map((response) => response.json().filter((t: urlType) => t.type === type)
        .subscribe(data => this.typeUrlArray = data,
        err => console.log(err),
        () => console.info('done')))
  }

  getContextUrl(type) {
    //this.typeUrlArray = this.typeUrlArray.filter((t: urlType) => t.type === type);
    let randomLink = this.typeUrlArray[Math.floor(Math.random() * this.typeUrlArray.length)];
    console.info('urlArray', this.typeUrlArray)
    console.info('randomlink', randomLink)
    this.contextUrl = randomLink.url;
    return this.contextUrl;
  }


  getProductMetaData(type: string, count?: number) {
    var productMetaData =
      {
        "id": "6f727ab181234f1b8a80aff0dbfadc7c",
        "family": "personal",
        "category": "credit-cards",
        "subcategory": "",
        "name": "low-rate",
        "url": "http://www.westpac.com.au/personal-banking/credit-cards/low-rate-card/low-rate/"
      }

    return productMetaData;
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
    return siteVars;

  }

  //createDataLayer called in component 
  createDataLayer(ptype) {
    this.patternType = ptype;

    interface prodArray {
      id?: string,
      family?: string,
      category?: string,
      subcategory?: string,
      name?: string,
      url?: string
    }
    switch (this.patternType) {
      case 'prod-view':
        let prodData: prodArray,
          commonVars,
          appendToDataLayer;

        // get product meta data when asked for by prod view and prod compare 
        // for compare switch the count between 2 to 3
        prodData = this.getProductMetaData(ptype, 1)


        // get url from the preoduct meta data
        this.contextUrl = prodData.url;
        console.info('getUrlByType --> ', this.contextUrl);

        commonVars = this.setCommonVars('url');

        //merge all data to creat the finalDataLayer
        appendToDataLayer = Object.assign({}, commonVars, prodData);
        this.dataLayer = Object.assign(this.dataLayer, appendToDataLayer);

        // send the final dataLayer to analytics function to track 
        // send final dataLayer to analyticsDebugger function 


        // look up productMetaData to get URL and productMeta data
        // save metadata in local object minus the URL
        // use the URL and call commonVars to get commonVars as object
        // extend productMetaData and common vars to create final object
        // set to a final var and trigger tracking 
        // Once tracking is triggered call tracking log function which sets import event and vars into variable to be displayed on the view
        break;
      case 'prod-compare':
        prodData = this.getProductMetaData(ptype, 1)
        console.info('prodData', prodData);
        // get url from the preoduct meta data

        this.contextUrl = prodData.url;
        console.info('getUrlByType --> ', this.contextUrl);

        commonVars = this.setCommonVars('url');
        console.info('commonVars', commonVars);

        //merge all data to creat the finalDataLayer
        appendToDataLayer = Object.assign({}, commonVars, prodData);
        console.info('appendToDataLayer', appendToDataLayer);

        this.dataLayer = Object.assign(this.dataLayer, appendToDataLayer);

        console.info('dataLayer', this.dataLayer)

        break;
      case 'faqpage':
        //this.contextUrl = this.getUrlByType(ptype);
        console.info('getUrlByType --> ', this.contextUrl);
        this.typeUrlArray = this.getUrlByType(this.patternType);
        this.contextUrl = this.getContextUrl(this.patternType);
        commonVars = this.setCommonVars(this.contextUrl);

        //merge all data to creat the finalDataLayer
        appendToDataLayer = Object.assign({}, commonVars);
        this.dataLayer = Object.assign(this.dataLayer, appendToDataLayer);
        //TODO
        break;
    }
    return this.dataLayer;
  }
}
