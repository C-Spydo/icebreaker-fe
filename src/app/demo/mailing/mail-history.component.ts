import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MailService } from '../../services/mailService';
import { Modal } from 'bootstrap';
// Project Import
import { CardComponent } from '../../theme/shared/components/card/card.component';
import { showNotification } from '../utils/notification';

@Component({
  selector: 'prospect-page',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent],
  templateUrl: './mail-history.component.html',
  styleUrls: ['./mail-history.component.scss']
})
export default class MailHistoryPageComponent {
  searchTerm: string = '';
  sortColumn: string = '';
  sortAsc: boolean = true;
  mailModal: Modal | null = null;

  mails: any[] = [];
  



  constructor(private mailService: MailService) {}

  ngOnInit() {
    this.loadMails();
    const modalElement = document.getElementById('mailDetailsModal');
    if (modalElement) {
      this.mailModal = new Modal(modalElement);
    }
  }

  loadMails() {
    this.mailService.fetchMails().subscribe({
      next: (data) => {
        this.mails = data.emails;
        console.log(this.mails);
      },
      error: (err) => {
        console.error('Error fetching prospects:', err);
      }
    });
  }


  filteredMails() {
    return this.mails
      .filter(mail =>
        Object.values(mail).some(value =>
          value?.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      )
      .sort((a, b) => {
        if (!this.sortColumn) return 0;
        const valA = a[this.sortColumn as keyof typeof a];
        const valB = b[this.sortColumn as keyof typeof a];
        return this.sortAsc ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1);
      });
  }

  sortData(column: string) {
    if (this.sortColumn === column) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortColumn = column;
      this.sortAsc = true;
    }
  }

  selectedMail: any = null;

  openMailModal(mail: any) {
    this.selectedMail = mail;
    this.mailModal?.show();
  }

  closeMailModal() {
    this.mailModal?.hide();
  }

  resendMail(mail_id: number) {
    this.mailService.resendMail(mail_id).subscribe({
      next: (data) => {
        showNotification(true,'Email ReSent successfully')
      },
      error: (err) => {
        showNotification(false,'Failed to ReSend email')
      }
    });
  }

  callProspect(mail: any) {
    alert(`Calling ${mail.prospect}...`);
  }

}


