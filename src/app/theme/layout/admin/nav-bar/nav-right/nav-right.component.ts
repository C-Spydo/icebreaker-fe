// Angular import
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
// third party import
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-nav-right',
  imports: [RouterModule, SharedModule],
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss']
})
export class NavRightComponent {
  name: string | null = '';
  email: string | null = '';
  payload: any = null;
  constructor(private router: Router) {}
  ngOnInit() {
    this.name = localStorage.getItem('name');
    this.email = localStorage.getItem('email');
    this.payload = JSON.parse(localStorage.getItem('google_payload') || '{}');
    console.log(this.payload.picture)
  }

  logout() {
    localStorage.removeItem('token'); // Clear token
    localStorage.removeItem('google_payload'); // Clear Google payload if stored
    this.router.navigate(['/login']); // Redirect to login
  }
}
