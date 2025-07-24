import { Component } from '@angular/core';

@Component({
  selector: 'app-hkftrust',
  imports: [],
  templateUrl: './hkftrust.component.html',
  styleUrl: './hkftrust.component.css'
})
export class HkftrustComponent {
confirmRedirect(): void {
    const userConfirmed = confirm(
      'You are about to leave this site and go to the Hong Kong Trust registration page. Do you want to continue?'
    );

    if (userConfirmed) {
      window.open('https://hongkongtrust.vercel.app/', '_blank');
    }
  }

}
