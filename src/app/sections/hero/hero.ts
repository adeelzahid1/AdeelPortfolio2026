import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  inject,
  signal,
  viewChild,
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
  private readonly heroRef = viewChild<ElementRef<HTMLElement>>('heroEl');
  private timer?: ReturnType<typeof setInterval>;
  private frame = 0;
  private pointerActive = false;
  private pointerX = 0;
  private pointerY = 0;
  private heroVisible = true;
  private reducedMotion = false;
  private observer?: IntersectionObserver;
  private readonly full = '> building scalable .NET + Angular systems';
  private readonly onVisibility = () => this.syncLoop();

  ngAfterViewInit(): void {
    let i = 0;
    this.timer = setInterval(() => {
      i += 1;
      this.typed.set(this.full.slice(0, i));
      if (i >= this.full.length && this.timer) {
        clearInterval(this.timer);
      }
    }, 42);

    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hero = this.heroRef()?.nativeElement;
    if (!hero || this.reducedMotion) {
      return;
    }

    this.observer = new IntersectionObserver(([entry]) => {
      this.heroVisible = entry.isIntersecting;
      this.syncLoop();
    });
    this.observer.observe(hero);
    document.addEventListener('visibilitychange', this.onVisibility);
    this.syncLoop();
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.stopLoop();
    this.observer?.disconnect();
    document.removeEventListener('visibilitychange', this.onVisibility);
  }

  contact(): void {
    this.scrollSpy.scrollTo('contact');
  }

  viewProjects(): void {
    void this.router.navigate(['/projects']);
  }

  onHeroPointer(event: PointerEvent): void {
    if (event.pointerType !== 'mouse' || this.reducedMotion) {
      return;
    }

    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    this.pointerActive = true;
    this.pointerX = event.clientX - rect.left;
    this.pointerY = event.clientY - rect.top;
  }

  onHeroPointerLeave(): void {
    this.pointerActive = false;
  }

  private syncLoop(): void {
    if (this.shouldRun()) {
      if (!this.frame) {
        this.frame = requestAnimationFrame(this.tick);
      }
      return;
    }

    this.stopLoop();
  }

  private shouldRun(): boolean {
    return !this.reducedMotion && this.heroVisible && document.visibilityState !== 'hidden';
  }

  private stopLoop(): void {
    if (!this.frame) {
      return;
    }
    cancelAnimationFrame(this.frame);
    this.frame = 0;
  }

  private readonly tick = (now: number): void => {
    const el = this.heroRef()?.nativeElement;
    if (el) {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        const x = this.pointerActive
          ? this.pointerX
          : rect.width * (0.5 + Math.cos(now / 1000 * 0.35) * 0.28);
        const y = this.pointerActive
          ? this.pointerY
          : rect.height * (0.46 + Math.sin(now / 1000 * 0.22) * 0.22);
        el.style.setProperty('--spot-x', `${x}px`);
        el.style.setProperty('--spot-y', `${y}px`);
        el.classList.add('is-spot');
      }
    }

    this.frame = this.shouldRun() ? requestAnimationFrame(this.tick) : 0;
  };

  onNameMove(event: MouseEvent): void {
    const el = event.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    if (rect.width <= 0) {
      return;
    }
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    el.style.setProperty('--shine-x', `${x}%`);
  }

  onNameLeave(event: MouseEvent): void {
    (event.currentTarget as HTMLElement).style.setProperty('--shine-x', '-20%');
  }
}
