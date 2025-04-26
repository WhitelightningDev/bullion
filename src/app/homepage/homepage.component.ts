import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MaterialModule } from '../material.services';

@Component({
  selector: 'app-homepage',
  imports: [MaterialModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

  ngOnInit() {
    const script = document.createElement('script');
    script.src = 'https://cdn.lordicon.com/lordicon.js';
    script.async = true;
    document.body.appendChild(script);
  }
  

}
