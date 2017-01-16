import { Routes, RouterModule } from '@angular/router';

import {HomeMainComponent } from './+home/main.component';
import {AboutComponent } from './+pages/about/about.component';
import {ChangelogComponent } from './+pages/changelog/changelog.component';
import {PatternMainComponent } from './+pattern/main/main.component';
import {PatternTypeComponent } from './+pattern/type/type.component';

const appRoutes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'home'},
    {path: 'home', component: HomeMainComponent},
    {path: 'about', component: AboutComponent},
    {path: 'pattern', component: PatternMainComponent},
    {path: 'change-log', component: ChangelogComponent},
    {path: 'pattern/:type', component: PatternTypeComponent}
];
export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(appRoutes);