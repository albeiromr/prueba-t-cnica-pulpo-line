import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { WeatherService } from '../../services/weather.service';
import { ToastService } from '../../../shared/services/toast.service';
import { WeatherModels } from '../../models/weather-models';
import { ToastSeverityEnum } from '../../../shared/enums/toast-severity.enum';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})
export class WheatherComponent implements OnInit {

  public cityCoincidenses: WeatherModels.CityCoincidence[];
  public cityInformation: WeatherModels.CityInformation | null = null;

  constructor(
    private weatherService: WeatherService,
    private toastService: ToastService
  ){}


  ngOnInit(): void {
    this.getCityCoincidences("med");
    this.getCityWeatherInformation("manizales");
  }


  getCityCoincidences(word: string): void {
    this.weatherService.searchAndAutoCompleteCity(word).subscribe(data => {
      this.cityCoincidenses = data;
    });
  }

  getCityWeatherInformation(city: string): void {
    this.weatherService.getSelectedCityWeatherInformation(city).subscribe(data => {
      this.cityInformation = data;
      this.toastService.showToast(
        ToastSeverityEnum.success,
        `Clima de ${city} consultado exitosamente`
      );
    })
  }
}
