import { Component, OnDestroy, OnInit  } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardLateralMenuComponent } from '../../components/dashboard-lateral-menu/dashboard-lateral-menu.component';
import { ApplicationHeaderComponent } from '../../components/application-header/application-header.component';
import { ApplicationFooterComponent } from '../../components/application-footer/application-footer.component';
import { DashboardLayoutComponent } from '../../components/dashboard-layout/dashboard-layout.component';
import { DashboardBreadcrumbComponent } from '../../components/dashboard-breadcrumb/dashboard-breadcrumb.component';
import { HideMnuService } from '../../../shared/services/hide-mnu.service';
import { Subject, fromEvent, debounceTime, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DashboardOverlayMenuComponent } from '../../components/dashboard-overlay-menu/dashboard-overlay-menu.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterOutlet, 
    ApplicationHeaderComponent,
    DashboardBreadcrumbComponent,
    DashboardLateralMenuComponent,
    DashboardOverlayMenuComponent,
    DashboardLayoutComponent,
    ApplicationFooterComponent,
    CommonModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnDestroy, OnInit {
  private resizeSubject = new Subject<Event>();
  private resizeSubscription: Subscription;

  screenWidthBrakpoint: number = 1024;
  screenWidth: number = 0;
  hideLeftPadding: boolean = true;
  hideLeftPaddingSubscription: Subscription;

  constructor(private hideMenuService: HideMnuService){

    // Configurar el observable de resize con debounce
    // Espera 100ms después del último evento
    this.resizeSubscription = this.resizeSubject.pipe( debounceTime(100)).subscribe(() => { 
      this.screenWidth = window.innerWidth;
      if(this.screenWidth < this.screenWidthBrakpoint) this.setHideLeftPadding();
      if(this.screenWidth > this.screenWidthBrakpoint && this.hideLeftPadding) this.hideMenuService.hideMenu.next(null);
    });
    // Inicializar el observable con el evento resize
    fromEvent(window, 'resize').subscribe(event => this.resizeSubject.next(event));
    
    this.hideLeftPaddingSubscription = this.hideMenuService.$hideMenu.subscribe(() => {
      this.setHideLeftPadding()
    })
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.setHideLeftPadding()
  }

  ngOnDestroy(): void {
    this.hideLeftPaddingSubscription.unsubscribe();
    this.resizeSubscription.unsubscribe();
  }

  /**
   * dependiendo del tamaño de la pantalla y de la interacción del usuario,
   * decide si el dashboard debe o no tener un padding a la izquierda
   */
  setHideLeftPadding(){
    if (this.screenWidth < this.screenWidthBrakpoint) this.hideLeftPadding = true;
    if (this.screenWidth > this.screenWidthBrakpoint) {
      if(this.hideLeftPadding) this.hideLeftPadding = false;
      else this.hideLeftPadding = true;
    }
  }

}
