import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { PoolfeaturesComponent } from './poolfeatures/poolfeatures.component';
import { FeesComponent } from './fees/fees.component';
import { DownloadsComponent } from './downloads/downloads.component';
import { ContactusComponent } from './contactus/contactus.component';
import { FaqComponent } from './faq/faq.component';
import { LearnComponent } from './learn/learn.component';
import { animate } from '@angular/animations';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';


export const routes: Routes = [

 { path: 'maintenance', component: MaintenanceComponent },


  { path: '', component: HomepageComponent, data: { animation: 'Home' } },
  {
    path: 'poolfeatures',
    component: PoolfeaturesComponent,
    data: { animation: 'PoolFeatures' },
  },
  { path: 'fees', component: FeesComponent, data: { animation: 'Fees' } },
  {
    path: 'downloads',
    component: DownloadsComponent,
    data: { animation: 'Downloads' },
  },
  {
    path: 'contact-us',
    component: ContactusComponent,
    data: { animation: 'Contact' },
  },
  { path: 'faq', component: FaqComponent, data: { animation: 'FAQ ' } },
  { path: 'learn', component: LearnComponent, data: { animate: 'Learn' } },
  {
    path: 'terms',
    component: TermsAndConditionsComponent,
    data: { animate: 'Terms And Conditions' },
  },
  {
    path: 'privacy', component: PrivacyPolicyComponent, data: {animate: 'Privacy Policy'}
  }
];
