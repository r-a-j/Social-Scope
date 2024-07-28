import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit {
  
  public currentYear!: number;
  
  public ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
  }
}
