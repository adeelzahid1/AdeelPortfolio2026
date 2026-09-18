import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { CURRENT_FOCUS } from '../../data/portfolio.data';

@Component({
  selector: 'app-current-focus',
  standalone: true,
  imports: [RevealOnScrollDirective],
  templateUrl: './current-focus.html',
  styleUrl: './current-focus.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentFocusComponent {
  readonly focus = CURRENT_FOCUS;
}
