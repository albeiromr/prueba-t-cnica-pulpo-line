import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { WeatherService } from '../../services/weather.service';
import { ToastService } from '../../../shared/services/toast.service';
import { WeatherModels } from '../../../shared/models/weather-models';
import { ToastSeverityEnum } from '../../../shared/enums/toast-severity.enum';
import { WeatherInterfaces } from '../../Interfaces/weather-interfaces';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { WeatherCardComponent } from '../../components/weather-card/weather-card.component';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { LocalStorageConstants } from '../../../shared/constants/local-storage.constants';
import { HistoryModels } from '../../../shared/models/history-models';
import { SelectedCityService } from '../../../shared/services/selected-city.service';

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
export class WheatherComponent implements OnInit {

  public cityCoincidenses: string[] = [];
  public selectedCity: string | null = null;
  public cityInformation: WeatherModels.CityInformation | null = null;
  public horaLocal: string = "";

  constructor(
    private weatherService: WeatherService,
    private toastService: ToastService,
    private localStorageService: LocalStorageService,
    private selectedCityService: SelectedCityService
  ){}

  ngOnInit(): void {

    // creando la lista del historial de busqueda si no existe
    const historylist = this.localStorageService.getItem<HistoryModels.Item[]>(LocalStorageConstants.history, true);
    if(!historylist) this.localStorageService.setItem<HistoryModels.Item[]>(LocalStorageConstants.history, new Array());

    // creando la lista de los favoritos de busqueda si no existe
    const favoritelist = this.localStorageService.getItem<WeatherModels.CityInformation[]>(LocalStorageConstants.favorites, true);
    if(!favoritelist) this.localStorageService.setItem<WeatherModels.CityInformation[]>(LocalStorageConstants.favorites, new Array());

    // buscando la información de una ciudad si dué solicitado
    // por el módulo de historial o favoritos;
    const sentCity = this.selectedCityService.getCity;
    if(sentCity){
      this.selectedCity = sentCity;
      this.getCityWeatherInformation();
      this.selectedCityService.setCity = null;
    }
    
  }

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
      this.saveSearchToHistory();
      this.toastService.showToast(
        ToastSeverityEnum.success,
        `El clima de ${this.selectedCity!} fue consultado exitosamente`
      );
    })
  }

  saveSearchToHistory(): void {
    const list = this.localStorageService.getItem<HistoryModels.Item[]>(LocalStorageConstants.history, true);

    const newItem: HistoryModels.Item = {
      date: new Date(),
      city: this.selectedCity!
    }

    list!.push(newItem);
    this.localStorageService.setItem(LocalStorageConstants.history, list);
  }

  saveCityToFavorites(){
    const list = this.localStorageService.getItem<WeatherModels.CityInformation[]>(LocalStorageConstants.favorites, true);
    list!.push(this.cityInformation!);
    this.localStorageService.setItem(LocalStorageConstants.favorites, list);
  }
}


