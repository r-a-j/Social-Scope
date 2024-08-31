import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

const imports = [
  RouterModule,
  CommonModule
];

@Component({
  selector: 'app-header',
  standalone: true,
  imports: imports,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public isLoggedIn = true;
  public userName = 'John Doe';

  logout() { }
}
