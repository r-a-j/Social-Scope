import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreadcrumbModel } from '../../models/breadcrumb.model';
import { BreadcrumbService } from '../../services/breadcrumb.service';

const imports = [CommonModule, RouterModule];

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: imports,
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: BreadcrumbModel[] = [];

  constructor(private breadcrumbService: BreadcrumbService) {}

  ngOnInit(): void {
    this.breadcrumbService.getBreadcrumbs().subscribe((breadcrumbs) => {
      this.breadcrumbs = breadcrumbs;
    });
  }
}