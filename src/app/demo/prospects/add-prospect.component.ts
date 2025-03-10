import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProspectService } from '../../services/prospectService';
import { NgSelectModule } from '@ng-select/ng-select';
import Swal from 'sweetalert2';

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
    industry_id: ''
  };



  constructor(private prospectService: ProspectService) {}

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
        console.log(data);
        Swal.fire({
          title: 'Success!',
          text: 'Prospect added successfully',
          icon: 'success',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });
      },
      error: (err) => {
        console.error('Error adding prospect:', err);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to add prospect',
          icon: 'error',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });
      }
    });
  }


}


