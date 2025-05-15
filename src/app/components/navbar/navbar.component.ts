import { Component, ElementRef, HostListener, ViewChild, Renderer2, AfterViewInit } from '@angular/core';
import { RouterModule } from "@angular/router";
import { RegisterpopupComponent } from "../../popups/registerpopup/registerpopup.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, RegisterpopupComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements AfterViewInit {
  @ViewChild('navbarCollapse') navbarCollapse!: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    // Close navbar on navigation link click
    const navLinks = this.navbarCollapse.nativeElement.querySelectorAll('.nav-link');
    navLinks.forEach((link: HTMLElement) => {
      this.renderer.listen(link, 'click', () => this.closeNavbar());
    });
  }

  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: Event) {
    if (
      this.navbarCollapse &&
      this.navbarCollapse.nativeElement.classList.contains('show') &&
      !this.navbarCollapse.nativeElement.contains(event.target)
    ) {
      this.closeNavbar();
    }
  }

  closeNavbar() {
    const collapseEl = this.navbarCollapse.nativeElement;
    if (collapseEl.classList.contains('show')) {
      const collapse = new (window as any).bootstrap.Collapse(collapseEl);
      collapse.hide();
    }
  }
}
