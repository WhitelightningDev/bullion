import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import 'zone.js';
import { provideServiceWorker } from '@angular/service-worker';
import { environment } from './environments/environment';

const updatedAppConfig = {
  ...appConfig,
  providers: [
    ...(appConfig.providers ?? []),
    ...(environment.production ? [provideServiceWorker('ngsw-worker.js', { enabled: true })] : [])
  ]
};

bootstrapApplication(AppComponent, updatedAppConfig)
  .catch((err) => console.error(err));
