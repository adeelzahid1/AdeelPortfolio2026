import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostListener,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-whatsapp-widget',
  standalone: true,
  templateUrl: './whatsapp-widget.html',
  styleUrl: './whatsapp-widget.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhatsAppWidgetComponent {
  private readonly platformId = inject(PLATFORM_ID);

  /** WhatsApp phone number without plus or spaces (e.g. 923157011812) */
  private readonly phoneNumber = '923157011812';

  readonly isOpen = signal<boolean>(false);
  readonly name = signal<string>('');
  readonly email = signal<string>('');
  readonly message = signal<string>('');
  readonly hasAttemptedSubmit = signal<boolean>(false);

  readonly isNameInvalid = computed(
    () => this.hasAttemptedSubmit() && !this.name().trim()
  );

  readonly isMessageInvalid = computed(
    () => this.hasAttemptedSubmit() && !this.message().trim()
  );

  toggle(): void {
    this.isOpen.update((v) => !v);
    if (!this.isOpen()) {
      this.hasAttemptedSubmit.set(false);
    }
  }

  close(): void {
    this.isOpen.set(false);
    this.hasAttemptedSubmit.set(false);
  }

  updateName(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.name.set(input.value);
  }

  updateEmail(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.email.set(input.value);
  }

  updateMessage(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    this.message.set(textarea.value);
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.hasAttemptedSubmit.set(true);

    const trimmedName = this.name().trim();
    const trimmedMessage = this.message().trim();

    if (!trimmedName || !trimmedMessage) {
      return;
    }

    const trimmedEmail = this.email().trim();

    // Construct formatted WhatsApp message
    const formattedText = [
      `*New Inquiry*`,
      ``,
      `*Name:* ${trimmedName}`,
      `*Email:* ${trimmedEmail || 'Not provided'}`,
      ``,
      `*Message:*`,
      trimmedMessage,
    ].join('\n');

    const whatsappUrl = `https://wa.me/${this.phoneNumber}?text=${encodeURIComponent(formattedText)}`;

    if (isPlatformBrowser(this.platformId)) {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }

    // Reset fields and close popup
    this.name.set('');
    this.email.set('');
    this.message.set('');
    this.hasAttemptedSubmit.set(false);
    this.isOpen.set(false);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isOpen()) {
      this.close();
    }
  }
}
