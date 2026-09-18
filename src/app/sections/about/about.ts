import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { AWARDS, KNOWLEDGE_BLURB, PROFILE, SUMMARY } from '../../data/portfolio.data';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RevealOnScrollDirective],
  templateUrl: './about.html',
  styleUrl: './about.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  readonly profile = PROFILE;
  readonly summary = SUMMARY;
  readonly knowledge = KNOWLEDGE_BLURB;
  readonly awards = AWARDS;
}
