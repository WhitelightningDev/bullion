import { Component, CUSTOM_ELEMENTS_SCHEMA, AfterViewInit } from '@angular/core';
import { MaterialModule } from '../material.services';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [MaterialModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements AfterViewInit {

  ngAfterViewInit() {
    // Load external Lordicon script
    const script = document.createElement('script');
    script.src = 'https://cdn.lordicon.com/lordicon.js';
    script.async = true;
    document.body.appendChild(script);

    const header = document.getElementById('welcome-header');
    const hasShown = localStorage.getItem('headerShown');

    if (header && !hasShown) {
      // Ensure opacity is 0 first
      header.style.opacity = '0';

      // Delay until next animation frame to trigger transition
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          header.classList.add('visible');
          localStorage.setItem('headerShown', 'true');
        });
      });
    } else if (header) {
      header.style.opacity = '1'; // Make sure it's visible
    }
  }
}
