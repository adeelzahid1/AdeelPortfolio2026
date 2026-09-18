import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollSpyService {
  readonly activeSection = signal('hero');

  setActive(id: string): void {
    if (id && this.activeSection() !== id) {
      this.activeSection.set(id);
    }
  }

  scrollTo(id: string): void {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.setActive(id);
    }
  }
}
