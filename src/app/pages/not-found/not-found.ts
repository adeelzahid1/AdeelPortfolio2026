import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';
import { ScrollSpyService } from '../../core/services/scroll-spy.service';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {
  readonly path = inject(Router).url.split('?')[0];

  constructor() {
    inject(Title).setTitle('404 | Adeel Zahid');
    inject(ScrollSpyService).setActive('');
  }
}
