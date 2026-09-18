import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../../core/services/theme.service';
import { ScrollSpyService } from '../../core/services/scroll-spy.service';
import { PROFILE } from '../../data/portfolio.data';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
  readonly theme = inject(ThemeService);
  readonly scrollSpy = inject(ScrollSpyService);
  private readonly router = inject(Router);
  readonly profile = PROFILE;
  readonly menuOpen = signal(false);
  readonly scrolled = signal(false);

  readonly links = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'tech', label: 'Stack' },
    { id: 'projects', label: 'Projects' },
    { id: 'work', label: 'Work' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
  ];

  ngOnInit(): void {
    this.onWindowScroll();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.scrolled.set(window.scrollY > 12);
  }

  toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  go(id: string): void {
    const onHome = this.router.url === '/' || this.router.url.startsWith('/#');
    if (onHome) {
      this.scrollSpy.scrollTo(id);
      this.closeMenu();
      return;
    }

    void this.router.navigate(['/']).then(() => {
      setTimeout(() => this.scrollSpy.scrollTo(id), 80);
    });
    this.closeMenu();
  }

  toggleTheme(): void {
    this.theme.toggle();
  }
}
