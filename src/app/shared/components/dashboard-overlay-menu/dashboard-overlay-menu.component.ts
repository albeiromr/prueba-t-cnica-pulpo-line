import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { SidebarModule } from 'primeng/sidebar';
import { DashboardLateralMenuComponent } from '../dashboard-lateral-menu/dashboard-lateral-menu.component';
import { Subscription } from 'rxjs';
import { HideMnuService } from '../../../shared/services/hide-mnu.service';

@Component({
  selector: 'app-dashboard-overlay-menu',
  standalone: true,
  imports: [
    SidebarModule,
    ButtonModule,
    CommonModule,
    DashboardLateralMenuComponent
  ],
  templateUrl: './dashboard-overlay-menu.component.html',
  styleUrl: './dashboard-overlay-menu.component.scss'
})
export class DashboardOverlayMenuComponent implements OnDestroy {
  showOverlayMenu: boolean = false;
  hideMenuSubscription: Subscription;

  constructor(private hideMenuService: HideMnuService) {
    this.hideMenuSubscription = this.hideMenuService.$hideMenu.subscribe(() => {
      if (this.showOverlayMenu) this.showOverlayMenu = false;
      else this.showOverlayMenu = true;
    })
  }

  ngOnDestroy(): void {
    this.hideMenuSubscription.unsubscribe();
  }

  toggelShowOverlayMenu() {
    if (this.showOverlayMenu) this.showOverlayMenu = false;
    else this.showOverlayMenu = true;
  }

}
