import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClientService } from '../../shared/services/http-client.service';
import { map, Observable } from 'rxjs';
import { WeatherModels } from '../models/weather-models';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private readonly searchAndAutocompleteEndpoint: string = "search.json?";
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
}
