import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProspectService } from '../../services/prospectService';
import { MailService } from '../../services/mailService';
import { NgSelectModule } from '@ng-select/ng-select';


// Project Import
import { CardComponent } from '../../theme/shared/components/card/card.component';
import { showNotification } from '../utils/notification';

@Component({
  selector: 'generate-mail-page',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent,  NgSelectModule, FormsModule, ],
  templateUrl: './generate-mail.component.html',
  styleUrls: ['./generate-mail.component.scss']
})
export default class GenerateMailPageComponent {
  prospects = [
    { id: 1, company_name: "ABC Ltd", industry_name: "Finance", contact_name: "John Doe", contact_phone: "1234567890", contact_email: "john@example.com" },
    { id: 2, company_name: "XYZ Corp", industry_name: "Technology", contact_name: "Jane Smith", contact_phone: "0987654321", contact_email: "jane@example.com" }
  ];
  
  selectedProspectId: number | null = null;
  selectedProspect: any = null;
  mailContent: string = "";

  constructor(private prospectService: ProspectService, private mailService: MailService) {}
  

  ngOnInit() {
    // this.fetchProspects();
  }

  loadProspectDetails() {
    this.selectedProspect = this.prospects.find(p => p.id == this.selectedProspectId) || null;
  }

  updateMailContent(event: any) {
    this.mailContent = event.target.innerHTML;
  }
  
  fetchProspects(){
    this.prospectService.fetchProspects().subscribe({
      next: (data) => {
        this.prospects = data;
        console.log(this.prospects)
      },
      error: (err) => {
        console.error('Error fetching prospects:', err);
      }
    });
  }

  generateMail() {
    this.mailContent = "Here is a content";
    return;
    this.mailService.generateMail(this.selectedProspectId).subscribe({
      next: (data) => {
        console.log(data);
        // this.mailContent = data.content
        showNotification(false,'Email generated successfully')
      },
      error: (err) => {
        console.error('Error adding prospect:', err);
        showNotification(false,'Failed to generate email')
      }
    });
  }

  sendMail() {
    if (!this.selectedProspectId || !this.mailContent) return;

    this.mailService.sendMail(this.selectedProspectId, this.mailContent).subscribe({
      next: (data) => {
        console.log(data);
        showNotification(false,'Email generated successfully')
      },
      error: (err) => {
        console.error('Error adding prospect:', err);
        showNotification(false,'Failed to generate email')
      }
    });
  }


}


