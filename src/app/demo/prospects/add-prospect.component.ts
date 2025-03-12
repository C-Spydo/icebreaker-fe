import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProspectService } from '../../services/prospectService';
import { NgSelectModule } from '@ng-select/ng-select';
import { showNotification } from 'src/app/demo/utils/notification';
import { Router } from '@angular/router';

// Project Import
import { CardComponent } from '../../theme/shared/components/card/card.component';

@Component({
  selector: 'add-prospect-page',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent,  NgSelectModule, FormsModule],
  templateUrl: './add-prospect.component.html',
  styleUrls: ['./add-prospect.component.scss']
})
export default class AddProspectPageComponent {
  searchTerm: string = '';
  sortColumn: string = '';
  sortAsc: boolean = true;
  industries: any[] = [];
  prospect = {
    company_name: '',
    contact_name: '',
    contact_email: '',
    contact_phone: '',
    industry_id: 0
  };



  constructor(private prospectService: ProspectService,  private router:Router) {}

  ngOnInit() {
    this.fetchIndustries();
  }

  fetchIndustries(){
    this.prospectService.fetchIndustries().subscribe({
      next: (data) => {
        this.industries = data;
        console.log(this.industries);
      },
      error: (err) => {
        console.error('Error fetching industries:', err);
      }
    });
  }

  addProspect() {
    this.prospectService.addProspect(this.prospect).subscribe({
      next: (data) => {
        showNotification(true, 'Prospect added successfully');
        this.router.navigate(['/prospects']);
      },
      error: (err) => {
        showNotification(false, 'Failed to add prospect:');
      }
    });
  }


}


