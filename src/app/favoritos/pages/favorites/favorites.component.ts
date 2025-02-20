import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { WeatherModels } from '../../../shared/models/weather-models';
import { LocalStorageConstants } from '../../../shared/constants/local-storage.constants';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';


@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CardModule, DividerModule, TableModule, ButtonModule, CommonModule, TooltipModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent implements OnInit {

  favorites : WeatherModels.CityInformation[];

  constructor(private localStorageService: LocalStorageService){}


  ngOnInit(): void {
    const list = this.localStorageService.getItem<WeatherModels.CityInformation[]>(LocalStorageConstants.favorites, true);

    if(!list) {
      this.favorites = [];
      return;
    }

    this.favorites = list.reverse();
  }

}
