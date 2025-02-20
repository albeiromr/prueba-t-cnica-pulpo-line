import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClientService } from '../../shared/services/http-client.service';
import { map, Observable } from 'rxjs';
import { WeatherModels } from '../../shared/models/weather-models';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private readonly searchAndAutocompleteEndpoint: string = "search.json?";
  private readonly currentCityinformationEndpoint: string = "current.json?";
  private readonly apikey: string = environment.apikey; 

  constructor(
    private httpClientService: HttpClientService,
  ) { }

  /**
   * Trae el resultado del autocompletado de la busqueda de ciudades
   */
  public searchAndAutoCompleteCity(word: string): Observable<WeatherModels.CityCoincidence[]> {

    const endpoint : string = `${this.searchAndAutocompleteEndpoint}q=${word}&key=${this.apikey}`;

    return this.httpClientService.sendGetRequest<WeatherModels.CityCoincidence[]>(endpoint)
    .pipe(
      map(res => {
        return res;
    }))
  }

  /**
   * Trae la información meteorológica de la ciudad seleccionada
   */
  public getSelectedCityWeatherInformation(city: string): Observable<WeatherModels.CityInformation> {

    const endpoint : string = `${this.currentCityinformationEndpoint}q=${city}&lang=es&key=${this.apikey}`;

    return this.httpClientService.sendGetRequest<WeatherModels.CityInformation>(endpoint)
    .pipe(
      map(res => {
        return res;
    }))

  }
}
