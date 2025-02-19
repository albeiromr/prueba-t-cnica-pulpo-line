import { Component, HostListener, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { HideMnuService } from '../../shared/services/hide-mnu.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-application-header',
  standalone: true,
  imports: [ButtonModule, BadgeModule, CommonModule],
  templateUrl: './application-header.component.html',
  styleUrl: './application-header.component.scss'
})
export class ApplicationHeaderComponent implements OnInit {

  widowWidth: number = 0;
  screenBrakpoint: number = 1024;

  constructor(private hideMenuService: HideMnuService){}

  ngOnInit(): void {
    this.widowWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
	onResize() {
		this.widowWidth = window.innerWidth;
	}

  handleHamburguerButtonClick(){
    this.hideMenuService.hideMenu.next(null);
  }
}
