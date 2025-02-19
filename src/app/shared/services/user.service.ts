import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { LocalStorageConstants } from '../constants/local-storage.constants';

@Injectable({
  providedIn: 'root'
})
/**
 * contiene métodos que permiten acceder y manipular la información del usuario que inició sesión en el navegador
 */
export class UserService {

  constructor(private localStorageService: LocalStorageService) { }

  /**
   * Cierra la sesión del usuario y limpia toda la información del mismo en el storage del navegador
   */
  public closeUserSession():void{
    this.localStorageService.deleteItem(LocalStorageConstants.accessToken);
  }
}
