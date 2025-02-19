import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { WeatherService } from '../../services/weather.service';
import { ToastService } from '../../../shared/services/toast.service';
import { WeatherModels } from '../../models/weather-models';

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
    this.getCityCoincidences();
    this.getCityWeatherInformation()
  }


  getCityCoincidences(): void {
    this.weatherService.searchAndAutoCompleteCity("med").subscribe(data => {
      console.log(data);
    });
  }

  getCityWeatherInformation(): void {
    this.weatherService.getSelectedCityWeatherInformation("manizales").subscribe(data => {
      console.log(data)
    })
  }
}
