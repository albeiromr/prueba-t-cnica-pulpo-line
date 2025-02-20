import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorMessagesConstants } from '../constants/error-messages.constants';
import { ToastService } from './toast.service';
import { ToastSeverityEnum } from '../enums/toast-severity.enum';

@Injectable({
  providedIn: 'root'
})
/**
 * Contiene métodos que permiten dar manejo a los errores causados por las solicitudes http
 */
export class ErrorHandlingService {

  constructor(
    private toastService: ToastService
  ) { }

  /**
   * filtra un error http y toma diferentes acciones según el código de error
   * @param error error http obtenido al hacer una solicitud
   */
  public handleHttpError(error: HttpErrorResponse): void {
    this.toastService.showToast(
      ToastSeverityEnum.error, 
      "Lo sentimos, se ha presentado un error, por favor intente nuevamente en unos minutos"
    )
  }

}
