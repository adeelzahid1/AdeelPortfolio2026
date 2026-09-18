import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { SKILLS } from '../../data/portfolio.data';

@Component({
  selector: 'app-tech-stack',
  standalone: true,
  imports: [RevealOnScrollDirective],
  templateUrl: './tech-stack.html',
  styleUrl: './tech-stack.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechStackComponent {
  readonly skills = SKILLS;
}
