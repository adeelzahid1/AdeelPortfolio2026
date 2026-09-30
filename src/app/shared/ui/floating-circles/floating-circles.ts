import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  PLATFORM_ID,
  signal,
  afterNextRender,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface CircleDef {
  size: number;
  color: string;
  opacity: number;
  blur: number;
  duration: number;
  delay: number;
  x0: string;
  y0: string;
  x1: string;
  y1: string;
}

@Component({
  selector: 'app-floating-circles',
  standalone: true,
  template: `
    @for (circle of circles(); track $index) {
      <span
        class="fc"
        [style.width.px]="circle.size"
        [style.height.px]="circle.size"
        [style.background]="circle.color"
        [style.opacity]="circle.opacity"
        [style.filter]="'blur(' + circle.blur + 'px)'"
        [style.--x0]="circle.x0"
        [style.--y0]="circle.y0"
        [style.--x1]="circle.x1"
        [style.--y1]="circle.y1"
        [style.--dur]="circle.duration + 's'"
        [style.--delay]="circle.delay + 's'"
        aria-hidden="true"
      ></span>
    }
  `,
  styleUrl: './floating-circles.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'aria-hidden': 'true',
    '[class.fc-hidden]': 'isHeroVisible()',
  },
})
export class FloatingCirclesComponent {
  /** Optional override for number of circles (capped at 15) */
  readonly count = input<number | undefined>(undefined);
  /** Minimum circle diameter in px (default 4) */
  readonly minSize = input<number>(4);
  /** Maximum circle diameter in px (default 12) */
  readonly maxSize = input<number>(12);
  /** Optional custom color list */
  readonly colors = input<string[]>([]);
  /** ID of element that, when visible in viewport, hides the circles container (default: 'hero') */
  readonly hideWhenVisibleId = input<string>('hero');

  readonly isHeroVisible = signal<boolean>(false);

  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private observer?: IntersectionObserver;

  private readonly defaultColors: string[] = [
    'var(--color-accent)',
    'var(--color-accent-bright)',
    'rgba(20, 184, 166, 0.85)',
    'rgba(45, 212, 191, 0.8)',
    'rgba(94, 234, 212, 0.75)',
    'var(--color-accent)',
  ];

  private readonly _circles = signal<CircleDef[]>([]);
  readonly circles = computed(() => this._circles());

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) return;

      this._circles.set(this.generateCircles());

      const targetId = this.hideWhenVisibleId();
      if (targetId) {
        const el = document.getElementById(targetId);
        if (el) {
          const rect = el.getBoundingClientRect();
          const inView = rect.bottom > 50 && rect.top < window.innerHeight;
          this.isHeroVisible.set(inView);

          this.observer = new IntersectionObserver(
            (entries) => {
              const entry = entries[0];
              this.isHeroVisible.set(entry.isIntersecting && entry.intersectionRatio > 0.05);
            },
            { threshold: [0, 0.05, 0.2, 0.5] }
          );
          this.observer.observe(el);
        }
      }

      this.destroyRef.onDestroy(() => {
        this.observer?.disconnect();
      });
    });
  }

  private generateCircles(): CircleDef[] {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const defaultTarget = isMobile ? 7 : 14;
    const requested = this.count() ?? defaultTarget;
    // Strictly cap at max 15 circles at any time
    const n = Math.min(Math.max(requested, 1), 15);

    const palette = this.colors().length ? this.colors() : this.defaultColors;
    const minS = this.minSize();
    const maxS = Math.min(this.maxSize(), 40);

    return Array.from({ length: n }, (_, i) => {
      const size = rand(minS, maxS);
      const color = palette[Math.floor(Math.random() * palette.length)];
      const opacity = randF(0.25, 0.52);
      const blur = randF(0.2, 0.8);
      const duration = rand(25, 60);
      // Negative delay pre-populates particles uniformly across the screen on first load
      const delay = -(Math.random() * duration);

      // Distribute directions: left-to-right, right-to-left, top-to-bottom, bottom-to-top, diagonals
      const dir = (i % 6);
      let x0 = '0vw';
      let y0 = '0vh';
      let x1 = '0vw';
      let y1 = '0vh';

      switch (dir) {
        case 0: {
          // Left to right with gentle vertical drift
          const y = rand(6, 92);
          const dy = rand(-14, 14);
          x0 = '-8vw';
          x1 = '108vw';
          y0 = `${y}vh`;
          y1 = `${clamp(y + dy, -4, 104)}vh`;
          break;
        }
        case 1: {
          // Right to left with gentle vertical drift
          const y = rand(6, 92);
          const dy = rand(-14, 14);
          x0 = '108vw';
          x1 = '-8vw';
          y0 = `${y}vh`;
          y1 = `${clamp(y + dy, -4, 104)}vh`;
          break;
        }
        case 2: {
          // Top to bottom with gentle horizontal drift
          const x = rand(6, 92);
          const dx = rand(-14, 14);
          x0 = `${x}vw`;
          x1 = `${clamp(x + dx, -4, 104)}vw`;
          y0 = '-8vh';
          y1 = '108vh';
          break;
        }
        case 3: {
          // Bottom to top with gentle horizontal drift
          const x = rand(6, 92);
          const dx = rand(-14, 14);
          x0 = `${x}vw`;
          x1 = `${clamp(x + dx, -4, 104)}vw`;
          y0 = '108vh';
          y1 = '-8vh';
          break;
        }
        case 4: {
          // Diagonal top-left to bottom-right
          const startX = rand(-6, 35);
          const deltaX = rand(55, 80);
          x0 = `${startX}vw`;
          x1 = `${startX + deltaX}vw`;
          y0 = '-8vh';
          y1 = '108vh';
          break;
        }
        case 5:
        default: {
          // Diagonal bottom-left to top-right
          const startX = rand(-6, 35);
          const deltaX = rand(55, 80);
          x0 = `${startX}vw`;
          x1 = `${startX + deltaX}vw`;
          y0 = '108vh';
          y1 = '-8vh';
          break;
        }
      }

      return {
        size,
        color,
        opacity,
        blur,
        duration,
        delay: Number(delay.toFixed(2)),
        x0,
        y0,
        x1,
        y1,
      };
    });
  }
}

function rand(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randF(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}
