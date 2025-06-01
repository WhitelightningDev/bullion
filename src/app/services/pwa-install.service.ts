import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface BeforeInstallPromptChoiceResult {
  outcome: 'accepted' | 'dismissed';
  platform: string;
}

@Injectable({ providedIn: 'root' })
export class PwaInstallService {
  private deferredPromptEvent: any = null;
  public canPrompt$ = new BehaviorSubject(false);

  constructor() {
    window.addEventListener('beforeinstallprompt', (event: Event) => {
      event.preventDefault();
      this.deferredPromptEvent = event;
      this.canPrompt$.next(true);
    });

    window.addEventListener('appinstalled', () => {
      this.deferredPromptEvent = null;
      this.canPrompt$.next(false);
      localStorage.setItem('pwaInstalled', 'true');
    });

    // Check on initialization if app is installed or uninstalled
    this.checkInstallationStatus();
  }


  promptInstall(): Promise<void> {
    if (!this.deferredPromptEvent) {
      return Promise.reject('No deferred prompt available');
    }

    return this.deferredPromptEvent.prompt()
      .then(() => this.deferredPromptEvent.userChoice)
      .then((choiceResult: BeforeInstallPromptChoiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          this.deferredPromptEvent = null;
          this.canPrompt$.next(false);
          localStorage.setItem('pwaInstalled', 'true');
        }
      });
  }

  isInstalled(): boolean {
  const isStandaloneDisplay = window.matchMedia('(display-mode: standalone)').matches;
  const isNavigatorStandalone = (window.navigator as any).standalone === true;
  const localInstalled = localStorage.getItem('pwaInstalled') === 'true';

  // Only return true if localStorage still has the flag AND it's actually in standalone
  return localInstalled && (isStandaloneDisplay || isNavigatorStandalone);
}


  checkInstallationStatus() {
  const actuallyInstalled = this.isInstalled();

  if (!actuallyInstalled) {
    // Remove false flag and re-allow install
    localStorage.removeItem('pwaInstalled');
    this.canPrompt$.next(true);
  } else {
    this.canPrompt$.next(false);
  }
}



}
