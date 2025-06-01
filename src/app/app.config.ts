import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import Aura from '@primeng/themes/aura';
import { routes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';

// Import your PwaInstallService
import { PwaInstallService } from './services/pwa-install.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          prefix: 'p',
          darkModeSelector: 'system',
          cssLayer: false
        }
      }
    }),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),  // enable in production, disable in dev
      registrationStrategy: 'registerWhenStable:30000'
    }),
    PwaInstallService // add your PWA service here
  ]
};
