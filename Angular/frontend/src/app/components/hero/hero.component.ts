import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

const imports = [RouterModule];

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: imports,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {

}
