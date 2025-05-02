import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-contactus',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    ToastModule
  ],
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.css',
  providers: [MessageService]
})
export class ContactusComponent {
  name = '';
  email = '';
  message = '';

  constructor(private messageService: MessageService) {}

  onSubmit() {
    if (this.name && this.email && this.message) {
      this.messageService.add({
        severity: 'success',
        summary: 'Message Sent',
        detail: `Thank you, ${this.name}! We'll get back to you shortly.`,
      });
      this.name = '';
      this.email = '';
      this.message = '';
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Incomplete Form',
        detail: 'Please fill out all fields.',
      });
    }
  }
}
