import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { EDUCATION, PROFILE } from '../../data/portfolio.data';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, RevealOnScrollDirective],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  readonly profile = PROFILE;
  readonly education = EDUCATION;
  readonly name = signal('');
  readonly message = signal('');

  sendMail(): void {
    const subject = encodeURIComponent(`Portfolio inquiry from ${this.name() || 'visitor'}`);
    const body = encodeURIComponent(this.message() || 'Hi Adeel, I found your portfolio and would like to connect.');
    window.location.href = `mailto:${this.profile.email}?subject=${subject}&body=${body}`;
  }
}
