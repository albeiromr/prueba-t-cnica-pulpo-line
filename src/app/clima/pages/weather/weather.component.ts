import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { WeatherService } from '../../services/weather.service';
import { ToastService } from '../../../shared/services/toast.service';
import { WeatherModels } from '../../models/weather-models';
import { ToastSeverityEnum } from '../../../shared/enums/toast-severity.enum';
import { WeatherInterfaces } from '../../Interfaces/weather-interfaces';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { WeatherCardComponent } from '../../components/weather-card/weather-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AutoCompleteModule, 
    CardModule,  
    FormsModule, 
    CommonModule, 
    ButtonModule,
    DividerModule,
    WeatherCardComponent
  ],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})
export class WheatherComponent {

  public cityCoincidenses: string[] = [];
  public selectedCity: string | null = null;
  public cityInformation: WeatherModels.CityInformation | null = null;
  public horaLocal: string = "";

  constructor(
    private weatherService: WeatherService,
    private toastService: ToastService
  ){}

  getCityCoincidences(event: WeatherInterfaces.AutoCompleteCompleteEvent): void {
    this.weatherService.searchAndAutoCompleteCity(event.query).subscribe(data => {

      let citiesCoincidenses: string[] = [];

      for(let i = 0; i < data.length; i++){
        citiesCoincidenses = [...citiesCoincidenses, data[i].name];
      }

      this.cityCoincidenses = citiesCoincidenses;
    });
  }

  getCityWeatherInformation(): void {

    if(this.selectedCity === null || this.selectedCity === "") {
      this.toastService.showToast(
        ToastSeverityEnum.warn,
        `Debe escribir el nombre de una ciudad para hacer una busqueda`
      );
      return;
    }

    this.weatherService.getSelectedCityWeatherInformation(this.selectedCity!).subscribe(data => {
      this.cityInformation = data;
      this.horaLocal = new Date(data.location.localtime).toLocaleTimeString();
      this.toastService.showToast(
        ToastSeverityEnum.success,
        `El clima de ${this.selectedCity!} fue consultado exitosamente`
      );
      console.log(this.cityInformation);
    })
  }
}


