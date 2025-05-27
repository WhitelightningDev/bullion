import { Component } from '@angular/core';

@Component({
  selector: 'app-registerpopup',
  templateUrl: './registerpopup.component.html',
  styleUrls: ['./registerpopup.component.css']
})
export class RegisterpopupComponent {

  goToRegister() {
    window.location.href = 'https://bullion.mycoop.co.za/account/register';
  }

  goToDownloads() {
    window.location.href = '/downloads#registration-guide';
  }


}
