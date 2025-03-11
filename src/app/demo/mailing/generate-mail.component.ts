import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
  styleUrls: ['./generate-mail.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export default class GenerateMailPageComponent {
  prospects = [
    { id: 1, company_name: "ABC Ltd", industry_name: "Finance", contact_name: "John Doe", contact_phone: "1234567890", contact_email: "john@example.com" },
    { id: 2, company_name: "XYZ Corp", industry_name: "Technology", contact_name: "Jane Smith", contact_phone: "0987654321", contact_email: "jane@example.com" }
  ];
  
  selectedProspectId: number | null = null;
  selectedProspect: any = null;
  mailContent: string = "";
  isEditorEnabled = false;

  constructor(private prospectService: ProspectService, private mailService: MailService) {}
  

  ngOnInit() {
    // this.fetchProspects();
  }

  loadProspectDetails() {
    this.selectedProspect = this.prospects.find(p => p.id == this.selectedProspectId) || null;
  }

  initializeEditor(event: any) {
    const editor = event.target; // Get the Trix editor instance
    editor.editor.setSelectedRange([0, 0]); // Move cursor to the start
    editor.editor.insertHTML(this.mailContent); // Inject initial content
  }

  updateMailContent(event: any) {
    this.mailContent = event.target.value;
    const editor = event.target;
    editor.style.height = "auto";
    editor.style.height = editor.scrollHeight + "px"; // Auto-expands
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
    this.isEditorEnabled = true;
    return;
    this.mailService.generateMail(this.selectedProspectId).subscribe({
      next: (data) => {
        console.log(data);
        // this.mailContent = data.content
        this.isEditorEnabled = true;
        showNotification(false,'Email generated successfully')
      },
      error: (err) => {
        console.error('Error adding prospect:', err);
        showNotification(false,'Failed to generate email')
      }
    });
  }

  sendMail() {
    console.log(this.mailContent);
    console.log(this.selectedProspectId);
    if (!this.selectedProspectId || !this.mailContent) return;

    this.mailService.sendMail(this.selectedProspectId, this.mailContent).subscribe({
      next: (data) => {
        console.log(data);
        showNotification(false,'Email Sent successfully')
      },
      error: (err) => {
        console.error('Error adding prospect:', err);
        showNotification(false,'Failed to Send email')
      }
    });
  }


}


