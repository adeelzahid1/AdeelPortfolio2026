import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { TESTIMONIALS } from '../../data/portfolio.data';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [RevealOnScrollDirective],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestimonialsComponent {
  readonly testimonials = TESTIMONIALS;
}
