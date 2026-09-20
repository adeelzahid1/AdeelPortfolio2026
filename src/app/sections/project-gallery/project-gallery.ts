import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { ALL_PROJECTS, CatalogProject, logoForProject } from '../../data/portfolio.data';

@Component({
  selector: 'app-project-gallery',
  standalone: true,
  imports: [NgTemplateOutlet, RevealOnScrollDirective],
  templateUrl: './project-gallery.html',
  styleUrl: './project-gallery.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectGalleryComponent {
  readonly projects: CatalogProject[];
  readonly rowA: CatalogProject[];
  readonly rowB: CatalogProject[];
  readonly failedLogos = new Set<string>();

  constructor() {
    this.projects = ALL_PROJECTS.map((project) => ({
      ...project,
      logo: logoForProject(project),
    }));
    const mid = Math.ceil(this.projects.length / 2);
    const a = this.projects.slice(0, mid);
    const b = this.projects.slice(mid);
    this.rowA = [...a, ...a];
    this.rowB = [...b, ...b];
  }

  initials(project: CatalogProject): string {
    return project.name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join('')
      .toUpperCase();
  }

  onLogoError(name: string): void {
    this.failedLogos.add(name);
  }
}
