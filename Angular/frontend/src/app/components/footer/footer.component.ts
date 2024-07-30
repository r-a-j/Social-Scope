import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

const imports = [RouterModule];

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: imports,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit {
  
  public currentYear!: number;
  
  public ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
  }
}
