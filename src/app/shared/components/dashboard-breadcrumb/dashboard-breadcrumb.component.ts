import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@Component({
  selector: 'app-dashboard-breadcrumb',
  standalone: true,
  imports: [BreadcrumbModule],
  templateUrl: './dashboard-breadcrumb.component.html',
  styleUrl: './dashboard-breadcrumb.component.scss'
})
export class DashboardBreadcrumbComponent implements OnInit {
  items: MenuItem[] | undefined;

  home: MenuItem | undefined;

  ngOnInit() {
    this.items = [
      { label: 'Dashboard' },
      { label: 'Bienvenido' },
    ];

    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

}
