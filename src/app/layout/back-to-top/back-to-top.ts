import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import { ScrollSpyService } from '../../core/services/scroll-spy.service';

@Component({
  selector: 'app-back-to-top',
  standalone: true,
  templateUrl: './back-to-top.html',
  styleUrl: './back-to-top.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackToTopComponent {
  private readonly scrollSpy = inject(ScrollSpyService);
  readonly visible = signal(false);

  @HostListener('window:scroll')
  onScroll(): void {
    this.visible.set(window.scrollY > 320);
  }

  goTop(): void {
    this.scrollSpy.scrollTo('hero');
  }
}
