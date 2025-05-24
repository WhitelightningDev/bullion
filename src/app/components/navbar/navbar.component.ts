import {
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  Renderer2,
  AfterViewInit
} from '@angular/core';
import { RouterModule } from "@angular/router";
import { RegisterpopupComponent } from "../../popups/registerpopup/registerpopup.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, RegisterpopupComponent, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements AfterViewInit {
  @ViewChild('navbarCollapse') navbarCollapse!: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    // Close navbar on nav-link click
    const navLinks = this.navbarCollapse.nativeElement.querySelectorAll('.nav-link');
    navLinks.forEach((link: HTMLElement) => {
      this.renderer.listen(link, 'click', () => this.closeNavbar());
    });
  }

  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: Event) {
    const clickedInside = this.navbarCollapse.nativeElement.contains(event.target);
    const isExpanded = this.navbarCollapse.nativeElement.classList.contains('show');

    if (isExpanded && !clickedInside) {
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

    showFloatingRegister = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.showFloatingRegister = scrollTop > 150; // Adjust as needed based on navbar height
  }

  openRegisterPopup() {
    // Logic to open your popup/modal
    const popup = document.querySelector('app-registerpopup') as any;
    if (popup?.open) {
      popup.open(); // Replace with whatever method triggers your popup
    }
  }

}
