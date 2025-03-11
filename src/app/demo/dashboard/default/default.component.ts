// Angular Import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { showNotification } from 'src/app/demo/utils/notification';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authService';

@Component({
  selector: 'app-default',
  imports: [CommonModule, SharedModule],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent {
    constructor(private authService: AuthService, private router:Router) {}
    stats: any = {};
    ngOnInit() {
      const token = localStorage.getItem('token');
      if (!token) {
        this.router.navigate(['/login']); // Redirect to login if token is missing
      }
      this.getDashboard();
    }

    getDashboard() {
      this.authService.getDashboard().subscribe({
        next: (data) => {
          this.stats = data;
          console.log(data)
        },
        error: (err) => {
          console.error('Error fetching prospects:', err);
        }
      });
    }
}
