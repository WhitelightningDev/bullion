import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { PoolfeaturesComponent } from './poolfeatures/poolfeatures.component';
import { FeesComponent } from './fees/fees.component';
import { DownloadsComponent } from './downloads/downloads.component';
import { ContactusComponent } from './contactus/contactus.component';

export const routes: Routes = [
  { path: "", component: HomepageComponent, data: { animation: 'Home' } },
  { path: "poolfeatures", component: PoolfeaturesComponent, data: { animation: 'PoolFeatures' } },
  { path: "fees", component: FeesComponent, data: { animation: 'Fees' } },
  { path: "downloads", component: DownloadsComponent, data: { animation: 'Downloads' } },
  { path: "contact-us", component: ContactusComponent, data: { animation: 'Contact' } }
];
