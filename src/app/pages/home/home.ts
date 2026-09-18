import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HeroComponent } from '../../sections/hero/hero';
import { AboutComponent } from '../../sections/about/about';
import { CurrentFocusComponent } from '../../sections/current-focus/current-focus';
import { TechStackComponent } from '../../sections/tech-stack/tech-stack';
import { ProjectsComponent } from '../../sections/projects/projects';
import { ProjectGalleryComponent } from '../../sections/project-gallery/project-gallery';
import { EducationComponent } from '../../sections/education/education';
import { LanguagesComponent } from '../../sections/languages/languages';
import { ServicesComponent } from '../../sections/services/services';
import { MoreComponent } from '../../sections/more/more';
import { ContactComponent } from '../../sections/contact/contact';
import { ScrollSpyService } from '../../core/services/scroll-spy.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    AboutComponent,
    CurrentFocusComponent,
    TechStackComponent,
    ProjectGalleryComponent,
    ProjectsComponent,
    EducationComponent,
    LanguagesComponent,
    ServicesComponent,
    MoreComponent,
    ContactComponent,
  ],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly scrollSpy = inject(ScrollSpyService);
  private readonly title = inject(Title);
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    this.title.setTitle('Adeel Zahid | Senior ASP.NET Developer · Angular 20 · .NET 8');
  }

  ngAfterViewInit(): void {
    const ids = [
      'hero',
      'about',
      'tech',
      'projects',
      'work',
      'education',
      'languages',
      'services',
      'interests',
      'contact',
    ];
    this.observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          this.scrollSpy.setActive(visible[0].target.id);
        }
      },
      { rootMargin: '-35% 0px -45% 0px', threshold: [0.1, 0.35, 0.6] }
    );

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) {
        this.observer.observe(el);
      }
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
