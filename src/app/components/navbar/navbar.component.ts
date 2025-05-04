import { Component } from '@angular/core';
import { RouterModule } from "@angular/router";
import { RegisterpopupComponent } from "../../popups/registerpopup/registerpopup.component";

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, RegisterpopupComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
