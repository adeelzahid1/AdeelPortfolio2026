import { ChangeDetectionStrategy, Component, HostListener, signal } from '@angular/core';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { SKILLS, SkillItem } from '../../data/portfolio.data';

@Component({
  selector: 'app-tech-stack',
  standalone: true,
  imports: [RevealOnScrollDirective],
  templateUrl: './tech-stack.html',
  styleUrl: './tech-stack.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechStackComponent {
  readonly skills = signal<SkillItem[]>([...SKILLS]);
  readonly draggingIndex = signal<number | null>(null);
  readonly overIndex = signal<number | null>(null);
  readonly ghost = signal<{
    name: string;
    category: string;
    x: number;
    y: number;
    w: number;
  } | null>(null);

  private pointerId: number | null = null;
  private fromIndex = -1;
  private grabX = 0;
  private grabY = 0;

  onPointerDown(event: PointerEvent, index: number): void {
    if (event.pointerType === 'mouse' && event.button !== 0) {
      return;
    }

    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const skill = this.skills()[index];
    this.pointerId = event.pointerId;
    this.fromIndex = index;
    this.grabX = event.clientX - rect.left;
    this.grabY = event.clientY - rect.top;
    this.draggingIndex.set(index);
    this.overIndex.set(index);
    this.ghost.set({
      name: skill.name,
      category: skill.category,
      x: rect.left,
      y: rect.top,
      w: rect.width,
    });
    document.body.classList.add('skill-dragging');
    target.setPointerCapture(event.pointerId);
    event.preventDefault();
  }

  @HostListener('document:pointermove', ['$event'])
  onPointerMove(event: PointerEvent): void {
    if (this.pointerId !== event.pointerId || this.fromIndex < 0) {
      return;
    }

    this.ghost.update((g) =>
      g
        ? {
            ...g,
            x: event.clientX - this.grabX,
            y: event.clientY - this.grabY,
          }
        : g,
    );

    const hit = document.elementFromPoint(event.clientX, event.clientY);
    const item = hit?.closest<HTMLElement>('[data-skill-index]');
    if (!item) {
      this.overIndex.set(null);
      return;
    }

    const next = Number(item.dataset['skillIndex']);
    if (Number.isFinite(next) && next !== this.fromIndex) {
      this.overIndex.set(next);
    } else if (next === this.fromIndex) {
      this.overIndex.set(this.fromIndex);
    }
  }

  @HostListener('document:pointerup', ['$event'])
  @HostListener('document:pointercancel', ['$event'])
  onPointerUp(event: PointerEvent): void {
    if (this.pointerId !== event.pointerId) {
      return;
    }

    const from = this.fromIndex;
    const to = this.overIndex();

    if (from >= 0 && to !== null && to !== from) {
      this.skills.update((list) => {
        const next = [...list];
        const [moved] = next.splice(from, 1);
        next.splice(to, 0, moved);
        return next;
      });
    }

    this.clearDrag();
  }

  private clearDrag(): void {
    this.pointerId = null;
    this.fromIndex = -1;
    this.grabX = 0;
    this.grabY = 0;
    this.draggingIndex.set(null);
    this.overIndex.set(null);
    this.ghost.set(null);
    document.body.classList.remove('skill-dragging');
  }
}
