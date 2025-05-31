import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import 'zone.js';
import { provideServiceWorker } from '@angular/service-worker';


const updatedAppConfig = {
  ...appConfig,
  providers: [
    ...(appConfig.providers ?? []),
  ]
};

bootstrapApplication(AppComponent, updatedAppConfig)
  .catch((err) => console.error(err));
