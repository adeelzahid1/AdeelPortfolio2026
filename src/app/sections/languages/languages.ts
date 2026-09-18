import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { LANGUAGES } from '../../data/portfolio.data';

@Component({
  selector: 'app-languages',
  standalone: true,
  imports: [RevealOnScrollDirective],
  templateUrl: './languages.html',
  styleUrl: './languages.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguagesComponent {
  readonly languages = LANGUAGES;
}
