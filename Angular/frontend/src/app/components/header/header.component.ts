import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

const imports = [RouterModule];

@Component({
  selector: 'app-header',
  standalone: true,
  imports: imports,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
