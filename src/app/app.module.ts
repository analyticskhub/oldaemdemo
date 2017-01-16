import { NgModule }       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { AppComponent }   from './app.component';



import { FormsModule } from '@angular/forms';
import { HttpModule, XHRBackend } from '@angular/http';

import { routing, appRoutingProviders } from './app.routes';



//import all built in components 
import {HomeMainComponent } from './+home/main.component';
import {AboutComponent } from './+pages/about/about.component';
import {ChangelogComponent } from './+pages/changelog/changelog.component';
import {PatternMainComponent } from './+pattern/main/main.component';
import {PatternTypeComponent } from './+pattern/type/type.component';
import {FooterComponent } from './+shared/footer/footer.component';
import {SidenavComponent } from './+shared/sidenav/sidenav.component';
import {ToolbarComponent } from './+shared/toolbar/toolbar.component';
import {ContentComponent } from './+shared/content/content.component';

import {BreadcrumbComponent } from './+shared/breadcrumb/breadcrumb.component';

import {DlWidgetComponent} from './+widget/dl-widget/dl-widget.component';
import {DlWidgetColumnOneComponent} from './+widget/dl-widget-column-one/dl-widget-column-one.component';
import {DlWidgetColumnTwoComponent} from './+widget/dl-widget-column-two/dl-widget-column-two.component';
import {DlWidgetUrlComponent} from './+widget/dl-widget-url/dl-widget-url.component';

import {DatalayerService} from './+services/datalayer.service';
import {urlService} from './+services/fetchdata.service';


@NgModule({
    declarations: [
        // root-app
        AppComponent,
        // other built components 
        HomeMainComponent,
        AboutComponent,
        ChangelogComponent,
        PatternTypeComponent,
        FooterComponent,
        SidenavComponent,
        ToolbarComponent,
        ContentComponent,
        BreadcrumbComponent,
        DlWidgetComponent,
        DlWidgetColumnOneComponent,
        DlWidgetColumnTwoComponent,
        DlWidgetUrlComponent
    ],
    imports: [
        BrowserModule,
        // Router
        routing,
        // Forms
        FormsModule,
        HttpModule

    ],
    providers: [appRoutingProviders, DatalayerService, urlService ],

    bootstrap: [AppComponent],
})
export class AppModule { }
