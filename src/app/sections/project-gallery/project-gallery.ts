import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { ALL_PROJECTS, CatalogProject, logoForProject } from '../../data/portfolio.data';

@Component({
  selector: 'app-project-gallery',
  standalone: true,
  imports: [RevealOnScrollDirective],
  templateUrl: './project-gallery.html',
  styleUrl: './project-gallery.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectGalleryComponent {
  readonly projects: CatalogProject[] = ALL_PROJECTS.map((project) => ({
    ...project,
    logo: logoForProject(project),
  }));

  readonly failedLogos = new Set<string>();

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
