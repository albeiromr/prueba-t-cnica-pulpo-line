import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * sirve para esconder y mostrar el menú lateral de navegacón
 */
export class HideMnuService {

  // emite señal para esconder o mostrar menu
  public hideMenu: Subject<any> = new Subject<any>();
  public $hideMenu: Observable<any> = this.hideMenu.asObservable();

  constructor() { }
}
