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

    switch (error.status) {
      case 401:
        // se cierra la seción del usuario
        break;
      case 400:
        this.toastService.showToast(ToastSeverityEnum.error, ErrorMessagesConstants.badRequest)
        break;
      case 409:
        this.toastService.showToast(ToastSeverityEnum.error, ErrorMessagesConstants.requestConflict)
        break;
      case 403:
        this.toastService.showToast(ToastSeverityEnum.error, ErrorMessagesConstants.forbidden)
        break;
      case 404:
        this.toastService.showToast(ToastSeverityEnum.error, ErrorMessagesConstants.notFound)
        break;
      case 405:
        this.toastService.showToast(ToastSeverityEnum.error, ErrorMessagesConstants.methodNotAllowed)
        break;
      case 429:
        this.toastService.showToast(ToastSeverityEnum.error, ErrorMessagesConstants.tooManyRequests)
        break;
      case 500:
        this.toastService.showToast(ToastSeverityEnum.error, ErrorMessagesConstants.internalError)
        break;
      case 502:
        this.toastService.showToast(ToastSeverityEnum.error, ErrorMessagesConstants.internalError)
        break;
      default:
        this.toastService.showToast(ToastSeverityEnum.error, "se presentó un error. código:" + error.status + ". error: " + error.message)
        break;
    }

  }

}
