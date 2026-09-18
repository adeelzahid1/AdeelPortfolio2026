import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  signal,
  viewChild,
} from '@angular/core';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import {
  INTERESTS,
  InterestItem,
} from '../../data/portfolio.data';

const AUTO_SLIDE_MS = 2000;
const DRAG_THRESHOLD_PX = 40;

@Component({
  selector: 'app-more',
  standalone: true,
  imports: [RevealOnScrollDirective],
  templateUrl: './more.html',
  styleUrl: './more.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoreComponent implements AfterViewInit, OnDestroy {
  private readonly track = viewChild<ElementRef<HTMLElement>>('interestTrack');

  readonly interests = INTERESTS;
  readonly loopedInterests: InterestItem[] = [...INTERESTS, ...INTERESTS, ...INTERESTS];
  readonly activeInterest = signal(0);
  readonly dragging = signal(false);
  readonly slideTone = signal<string[]>([]);

  private timer?: ReturnType<typeof setInterval>;
  private toneFrame = 0;
  private pointerId: number | null = null;
  private startX = 0;
  private startScroll = 0;
  private hoverPaused = false;
  private dragPaused = false;
  private reduceMotion = false;
  private looping = false;

  ngAfterViewInit(): void {
    this.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    requestAnimationFrame(() => {
      this.goToLooped(this.interests.length, false);
      this.refreshTones();
      this.startAuto();
    });
  }

  ngOnDestroy(): void {
    this.stopAuto();
    if (this.toneFrame) {
      cancelAnimationFrame(this.toneFrame);
    }
  }

  pauseAuto(reason: 'hover' | 'drag'): void {
    if (reason === 'hover') {
      this.hoverPaused = true;
    } else {
      this.dragPaused = true;
    }
    this.stopAuto();
  }

  resumeAuto(reason: 'hover' | 'drag'): void {
    if (reason === 'hover') {
      this.hoverPaused = false;
    } else {
      this.dragPaused = false;
    }
    this.startAuto();
  }

  prevInterest(): void {
    this.goToLooped(this.loopedIndex() - 1);
  }

  nextInterest(): void {
    this.goToLooped(this.loopedIndex() + 1);
  }

  goToInterest(index: number): void {
    const total = this.interests.length;
    if (!total) {
      return;
    }

    const wrapped = ((index % total) + total) % total;
    this.goToLooped(total + wrapped);
  }

  onInterestScroll(): void {
    if (this.looping) {
      return;
    }

    const looped = this.loopedIndex();
    this.activeInterest.set(this.uniqueIndex(looped));
    this.scheduleTones();
    this.recenterIfNeeded(looped);
  }

  onPointerDown(event: PointerEvent): void {
    if (event.pointerType === 'mouse' && event.button !== 0) {
      return;
    }

    const target = event.target as HTMLElement;
    if (target.closest('a, button')) {
      return;
    }

    const el = this.track()?.nativeElement;
    if (!el) {
      return;
    }

    this.pointerId = event.pointerId;
    this.startX = event.clientX;
    this.startScroll = el.scrollLeft;
    this.dragging.set(true);
    this.pauseAuto('drag');
    el.setPointerCapture(event.pointerId);
  }

  onPointerMove(event: PointerEvent): void {
    if (!this.dragging() || event.pointerId !== this.pointerId) {
      return;
    }

    const el = this.track()?.nativeElement;
    if (!el) {
      return;
    }

    el.scrollLeft = this.startScroll - (event.clientX - this.startX);
    this.scheduleTones();
    event.preventDefault();
  }

  onPointerUp(event: PointerEvent): void {
    if (!this.dragging() || event.pointerId !== this.pointerId) {
      return;
    }

    const el = this.track()?.nativeElement;
    el?.releasePointerCapture(event.pointerId);

    const dx = event.clientX - this.startX;
    this.dragging.set(false);
    this.pointerId = null;

    if (dx < -DRAG_THRESHOLD_PX) {
      this.nextInterest();
    } else if (dx > DRAG_THRESHOLD_PX) {
      this.prevInterest();
    } else {
      this.goToLooped(this.loopedIndex());
    }

    this.resumeAuto('drag');
  }

  private goToLooped(loopIndex: number, smooth = true): void {
    const el = this.track()?.nativeElement;
    const step = this.slideStep();
    if (!el || step <= 0) {
      return;
    }

    const max = this.loopedInterests.length - 1;
    const clamped = Math.min(Math.max(loopIndex, 0), max);
    this.activeInterest.set(this.uniqueIndex(clamped));
    el.scrollTo({
      left: clamped * step,
      behavior: smooth && !this.dragging() && !this.reduceMotion ? 'smooth' : 'auto',
    });
    this.scheduleTones();
  }

  private recenterIfNeeded(looped: number): void {
    const n = this.interests.length;
    if (!n || this.dragging()) {
      return;
    }

    if (looped < n) {
      this.jumpTo(looped + n);
    } else if (looped >= n * 2) {
      this.jumpTo(looped - n);
    }
  }

  private jumpTo(looped: number): void {
    const el = this.track()?.nativeElement;
    const step = this.slideStep();
    if (!el || step <= 0) {
      return;
    }

    this.looping = true;
    el.scrollTo({ left: looped * step, behavior: 'auto' });
    this.activeInterest.set(this.uniqueIndex(looped));
    requestAnimationFrame(() => {
      this.looping = false;
      this.refreshTones();
    });
  }

  private loopedIndex(): number {
    const step = this.slideStep();
    const el = this.track()?.nativeElement;
    if (!el || step <= 0) {
      return this.interests.length;
    }

    return Math.round(el.scrollLeft / step);
  }

  private uniqueIndex(looped: number): number {
    const n = this.interests.length;
    return n ? ((looped % n) + n) % n : 0;
  }

  private slideStep(): number {
    const el = this.track()?.nativeElement;
    const card = el?.querySelector<HTMLElement>('.interest-slide');
    if (!el || !card) {
      return 0;
    }

    const styles = getComputedStyle(el);
    const gap = Number.parseFloat(styles.columnGap || styles.gap) || 16;
    return card.offsetWidth + gap;
  }

  private scheduleTones(): void {
    if (this.toneFrame) {
      return;
    }

    this.toneFrame = requestAnimationFrame(() => {
      this.toneFrame = 0;
      this.refreshTones();
    });
  }

  private refreshTones(): void {
    const el = this.track()?.nativeElement;
    if (!el) {
      return;
    }

    const view = el.getBoundingClientRect();
    const leftEdge = view.left + view.width * 0.25;
    const rightEdge = view.right - view.width * 0.25;
    const tones: string[] = [];

    el.querySelectorAll<HTMLElement>('.interest-slide').forEach((card) => {
      const box = card.getBoundingClientRect();
      const center = box.left + box.width / 2;

      if (center < view.left - 8 || center > view.right + 8) {
        tones.push('off');
      } else if (center < leftEdge) {
        tones.push('edge-left');
      } else if (center > rightEdge) {
        tones.push('edge-right');
      } else {
        tones.push('focus');
      }
    });

    this.slideTone.set(tones);
  }

  private startAuto(): void {
    this.stopAuto();
    if (this.reduceMotion || this.hoverPaused || this.dragPaused) {
      return;
    }

    this.timer = setInterval(() => this.nextInterest(), AUTO_SLIDE_MS);
  }

  private stopAuto(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
  }
}
