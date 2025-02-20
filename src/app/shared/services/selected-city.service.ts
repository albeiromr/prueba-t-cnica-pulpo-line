import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

/**
 * Contiene la subscripción glogal que permite volver a seleccionar o buscar una ciudad
 * y obtener nuevamente la información actual de su clima
 */
export class SelectedCityService {

  private city: string | null = null;

  get getCity(): string | null {
    return this.city
  }

  set setCity(city: string | null) {
    this.city = city;
  }

}
