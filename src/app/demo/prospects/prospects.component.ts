import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProspectService } from '../../services/prospectService';

// Project Import
import { CardComponent } from '../../theme/shared/components/card/card.component';

@Component({
  selector: 'prospect-page',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent],
  templateUrl: './prospects.component.html',
  styleUrls: ['./prospects.component.scss']
})
export default class ProspectPageComponent {
  searchTerm: string = '';
  sortColumn: string = '';
  sortAsc: boolean = true;
  prospects: any[] = [];



  constructor(private prospectService: ProspectService) {}

  ngOnInit() {
    this.loadProspects();
  }

  loadProspects() {
    this.prospectService.fetchProspects().subscribe({
      next: (data) => {
        this.prospects = data.prospects;
        console.log(this.prospects);
      },
      error: (err) => {
        console.error('Error fetching prospects:', err);
      }
    });
  }


  filteredProspects() {
    return this.prospects
      .filter(prospect =>
        Object.values(prospect).some(value =>
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

}



  // prospects = [
  //   { id: 1, company_name: 'TechCorp', industry: 'Technology', contact_name: 'John Doe', contact_email: 'john@techcorp.com', contact_phone: '+1234567890' },
  //   { id: 2, company_name: 'FashionHouse', industry: 'Fashion', contact_name: 'Jane Smith', contact_email: 'jane@fashionhouse.com', contact_phone: '+1234567891' },
  //   { id: 3, company_name: 'MediCare', industry: 'Healthcare', contact_name: 'Alice Brown', contact_email: 'alice@medicare.com', contact_phone: '+1234567892' },
  //   { id: 4, company_name: 'BizSolutions', industry: 'Finance', contact_name: 'Bob Johnson', contact_email: 'bob@bizsolutions.com', contact_phone: '+1234567893' },
  //   { id: 5, company_name: 'EduWorld', industry: 'Education', contact_name: 'Charlie Lee', contact_email: 'charlie@eduworld.com', contact_phone: '+1234567894' },
  //   { id: 6, company_name: 'AutoMotiveX', industry: 'Automobile', contact_name: 'David Kim', contact_email: 'david@automotivex.com', contact_phone: '+1234567895' },
  //   { id: 7, company_name: 'GreenEnergy', industry: 'Energy', contact_name: 'Emma Wilson', contact_email: 'emma@greenenergy.com', contact_phone: '+1234567896' },
  //   { id: 8, company_name: 'AgriFarm', industry: 'Agriculture', contact_name: 'Frank Adams', contact_email: 'frank@agrifarm.com', contact_phone: '+1234567897' },
  //   { id: 9, company_name: 'RealEstatePro', industry: 'Real Estate', contact_name: 'Grace Kelly', contact_email: 'grace@realestatepro.com', contact_phone: '+1234567898' },
  //   { id: 10, company_name: 'MediaWorks', industry: 'Media', contact_name: 'Henry Carter', contact_email: 'henry@mediaworks.com', contact_phone: '+1234567899' },
  // ];