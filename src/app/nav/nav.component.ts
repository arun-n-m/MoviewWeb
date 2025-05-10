import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  constructor() { }

  menuActive: boolean = false;
  
  toggleMenu() {
    this.menuActive = !this.menuActive;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const header = document.querySelector('header') as HTMLElement;
    if (window.scrollY > 50) {
      header.style.background = 'rgba(0, 0, 0, 0.9)';
    } else {
      header.style.background = 'rgba(0, 0, 0, 0.7)';
    }
  }

  @HostListener('window:resize', [])
  onResize() {
    if (window.innerWidth > 768 && this.menuActive) {
      this.menuActive = false;
    }
  }
}
