import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

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
    ToastModule,
    TranslateModule
  ],
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css'],
  providers: [MessageService]
})
export class ContactusComponent {
  name = '';
  email = '';
  message = '';

  constructor(private messageService: MessageService, private translate: TranslateService) {}

  onSubmit() {
    if (this.name && this.email && this.message) {
      this.translate.get(
        ['CONTACT.TOAST.SUCCESS_SUMMARY', 'CONTACT.TOAST.SUCCESS_DETAIL'],
        { name: this.name }
      ).subscribe(translations => {
        this.messageService.add({
          severity: 'success',
          summary: translations['CONTACT.TOAST.SUCCESS_SUMMARY'],
          detail: translations['CONTACT.TOAST.SUCCESS_DETAIL'],
        });
      });
      this.name = '';
      this.email = '';
      this.message = '';
    } else {
      this.translate.get(['CONTACT.TOAST.ERROR_SUMMARY', 'CONTACT.TOAST.ERROR_DETAIL'])
        .subscribe(translations => {
          this.messageService.add({
            severity: 'error',
            summary: translations['CONTACT.TOAST.ERROR_SUMMARY'],
            detail: translations['CONTACT.TOAST.ERROR_DETAIL'],
          });
        });
    }
  }
}
