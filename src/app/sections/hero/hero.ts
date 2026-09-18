import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { ScrollSpyService } from '../../core/services/scroll-spy.service';
import { PROFILE } from '../../data/portfolio.data';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.html',
  styleUrl: './hero.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  private readonly scrollSpy = inject(ScrollSpyService);
  private readonly router = inject(Router);
  readonly profile = PROFILE;
  readonly typed = signal('');
  private timer?: ReturnType<typeof setInterval>;
  private readonly full = '> building scalable .NET + Angular systems';

  ngAfterViewInit(): void {
    let i = 0;
    this.timer = setInterval(() => {
      i += 1;
      this.typed.set(this.full.slice(0, i));
      if (i >= this.full.length && this.timer) {
        clearInterval(this.timer);
      }
    }, 42);
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  contact(): void {
    this.scrollSpy.scrollTo('contact');
  }

  viewProjects(): void {
    void this.router.navigate(['/projects']);
  }
}
