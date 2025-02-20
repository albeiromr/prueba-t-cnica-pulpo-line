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
import { Router } from '@angular/router';
import { RouterConstans } from '../../../shared/constants/router.constants';
import { SelectedCityService } from '../../../shared/services/selected-city.service';
import { ToastSeverityEnum } from '../../../shared/enums/toast-severity.enum';
import { ToastService } from '../../../shared/services/toast.service';


@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CardModule, DividerModule, TableModule, ButtonModule, CommonModule, TooltipModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent implements OnInit {

  favorites : WeatherModels.CityInformation[];

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private selectedCityService: SelectedCityService,
    private toastService: ToastService
  ){}


  ngOnInit(): void {
    const list = this.localStorageService.getItem<WeatherModels.CityInformation[]>(LocalStorageConstants.favorites, true);

    if(!list) {
      this.favorites = [];
      return;
    }

    this.favorites = list.reverse();
  }

  goToSearchPage(): void {
    this.router.navigate([RouterConstans.weather]);
  }
  
  searchCityAgain(city: string): void {
    this.selectedCityService.setCity = city;
    this.router.navigate([RouterConstans.weather]);
  }

  deleteCityFromFavorites(cityInformation: WeatherModels.CityInformation){
    const list = this.localStorageService.getItem<WeatherModels.CityInformation[]>(LocalStorageConstants.favorites, true);

    const newList = list.filter(
      city => city.location.name !== cityInformation.location.name &&
      city.location.region !== cityInformation.location.region
    );

    this.localStorageService.setItem<WeatherModels.CityInformation[]>(LocalStorageConstants.favorites, newList);

    this.favorites = newList;

    this.toastService.showToast(
      ToastSeverityEnum.success,
      `La ciudad ${cityInformation.location.name} se eliminó exitosamente de tus favoritos`
    );
  }

}
