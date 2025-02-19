import { Injectable } from '@angular/core';
import { ErrorMessagesConstants } from '../constants/error-messages.constants';

@Injectable({
  providedIn: 'root'
})

/**
 * Contiene métodos que permiten leer y manipular el local storage del navegador
 */
export class LocalStorageService {

  /**
   * Guarda o actualiza un item en el local storage
   * @param keyName El nombre de la clave para almacenar el dato
   * @param payload El dato a almacenar (puede ser una cadena de texto o un objeto, array etc)
   * 
   *  al llamar el método se debe pasar el tipo de dato genérico setItem<T>() 
   */
  public setItem<T>(keyName: string, payload: T): void {
    try {
      const valueToStore = (typeof payload === 'string')
        ? payload
        : JSON.stringify(payload);
        window.localStorage.setItem(keyName, valueToStore);
    } catch (error) {
      console.error(ErrorMessagesConstants.localStorageItemSavingError, error);
    }
  }
  
  /**
   * consulta un item en el local storage y retorna su valor.
   * @param keyName El nombre de la clave del item que se desea obtener
   * @param parseJson si el item que se desea obtener se debe o no parsear
   * 
   * al llamar el método se debe pasar el tipo de dato genérico getItem<T>()
   */
  public getItem<T>(key: string, parseJson: boolean = false): T | string | null {
    try {
      const value = window.localStorage.getItem(key);
      if (value === null) {
        return null; // El key no existe
      }
      return parseJson ? JSON.parse(value) as T : value;
    } catch (error) {
      console.error(ErrorMessagesConstants.localStorageItemReadingError, error);
      return null;
    }
  }

  /**
   * elimina un item del local storage usando el nombre de su key
   * @param keyName El nombre de la clave del item que se desea eliminar
   */
  public deleteItem(keyName: string) {
    window.localStorage.removeItem(keyName);
  }

}
