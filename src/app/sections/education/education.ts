import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { EDUCATION_ITEMS } from '../../data/portfolio.data';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [RevealOnScrollDirective],
  templateUrl: './education.html',
  styleUrl: './education.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EducationComponent {
  readonly education = EDUCATION_ITEMS;
}
