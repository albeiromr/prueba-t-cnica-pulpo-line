import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { CommonModule } from '@angular/common';
import { HideMnuService } from '../../../shared/services/hide-mnu.service';
import { Subscription } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-lateral-menu',
  standalone: true,
  imports: [MenuModule, BadgeModule, RippleModule, AvatarModule, CommonModule, RouterModule],
  templateUrl: './dashboard-lateral-menu.component.html',
  styleUrl: './dashboard-lateral-menu.component.scss'
})
export class DashboardLateralMenuComponent implements OnInit, OnDestroy {
  @Input("isInsideLaterlOverlay") isInsideLateralOverlay: boolean = false;

  hideMenu: boolean = false;
  hideMenuSubscription: Subscription;
  windowWidthBreakpoint: number = 1024;

  items: MenuItem[] | undefined;

  constructor(private hideMenuService: HideMnuService){
    this.hideMenuSubscription = this.hideMenuService.$hideMenu.subscribe(() => {
      if(this.hideMenu) this.hideMenu = false;
      else this.hideMenu = true;
    })
  }

  ngOnInit() {

    this.items = [
      {
        separator: true
      },
      {
        label: 'Inicio',
        items: [
          {
            label: 'Clima',
            icon: 'pi pi-sun',
            route: '/dashboard/clima'
          },
          {
            label: 'Busqueda',
            icon: 'pi pi-search',
            route: '/busqueda'
          }
        ]
      },
      {
        label: 'Archivo',
        items: [
          {
            label: 'Favoritos',
            icon: 'pi pi-star',
            badge: '5',
            route: '/dashboard/favoritos'
          },
        ]
      },
      {
        separator: false
      }
    ];
  }

  ngOnDestroy(): void {
    this.hideMenuSubscription.unsubscribe();
  }

  handleLinkClick(){
    if(window.innerWidth < this.windowWidthBreakpoint) this.hideMenuService.hideMenu.next(null);
  }

}
