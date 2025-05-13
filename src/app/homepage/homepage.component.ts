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
    const script = document.createElement('script');
    script.src = 'https://cdn.lordicon.com/lordicon.js';
    script.async = true;
    document.body.appendChild(script);

    const header = document.getElementById('welcome-header');
    const hasShown = localStorage.getItem('headerShown');

    if (header && !hasShown) {
      // Ensure it's hidden initially
      header.style.opacity = '0';

      // Defer animation until DOM is really ready (delay > render + asset load)
      setTimeout(() => {
        header.classList.add('visible');
        localStorage.setItem('headerShown', 'true');
      }, 100); // slight delay ensures image is there
    } else if (header) {
      header.style.opacity = '1';
    }
  }

}
