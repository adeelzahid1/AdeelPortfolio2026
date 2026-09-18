import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { ScrollSpyService } from '../../core/services/scroll-spy.service';
import { LOGO_GALLERY } from '../../data/portfolio.data';

@Component({
  selector: 'app-logo-gallery',
  standalone: true,
  imports: [RouterLink, RevealOnScrollDirective],
  templateUrl: './logo-gallery.html',
  styleUrl: './logo-gallery.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoGalleryComponent {
  readonly groups = LOGO_GALLERY;

  constructor() {
    inject(Title).setTitle('Projects | Adeel Zahid');
    inject(ScrollSpyService).setActive('');
  }
}
