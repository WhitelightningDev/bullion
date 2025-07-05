import { Component } from '@angular/core';
import { PwaInstallService } from '../../services/pwa-install.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pwa-install-prompt',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="showPrompt" class="pwa-install-prompt">
      <p>Install this app on your device for a better experience.</p>
      <button (click)="install()">Install</button>
      <button (click)="close()">Maybe later</button>
    </div>
  `,
  styles: [`
    .pwa-install-prompt {
      position: fixed;
      top: 0; /* changed to top for prompt from top */
      left: 0;
      right: 0;
      background: #007bff;
      color: white;
      padding: 1em;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 1000;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    button {
      background: white;
      border: none;
      color: #007bff;
      font-weight: bold;
      padding: 0.5em 1em;
      border-radius: 4px;
      cursor: pointer;
      margin-left: 0.5em;
    }
  `]
})
export class PwaInstallPromptComponent {
  showPrompt = false;

  constructor(private pwaInstallService: PwaInstallService) {
    const dismissed = localStorage.getItem('pwaPromptDismissed') === 'true';

    if (!dismissed && !this.pwaInstallService.isInstalled()) {
      this.showPrompt = true;
    }

    this.pwaInstallService.canPrompt$.subscribe(canPrompt => {
      if (canPrompt && !this.pwaInstallService.isInstalled()) {
        this.showPrompt = true;
      } else {
        this.showPrompt = false;
      }
    });
  }

  install() {
    this.pwaInstallService.promptInstall()
      .catch(console.error)
      .finally(() => {
        this.showPrompt = false;
        localStorage.setItem('pwaPromptDismissed', 'true');
      });
  }

  close() {
    this.showPrompt = false;
    localStorage.setItem('pwaPromptDismissed', 'true');
  }
}
