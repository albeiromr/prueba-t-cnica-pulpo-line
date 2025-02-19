import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from './user.service';
import { ErrorMessagesConstants } from '../constants/error-messages.constants';

@Injectable({
  providedIn: 'root'
})
/**
 * Contiene métodos que permiten dar manejo a los errores causados por las solicitudes http
 */
export class ErrorHandlingService {

  constructor(
    private userService: UserService
  ) { }

  /**
   * filtra un error http y toma diferentes acciones según el código de error
   * @param error error http obtenido al hacer una solicitud
   */
  public handleHttpError(error: HttpErrorResponse): void {

    switch (error.status) {
      case 401:
        // el token ha expirado, se cierra la sesión del usuario
        this.userService.closeUserSession();
        break;
      case 400:
        console.error(ErrorMessagesConstants.badRequest);
        break;
      case 409:
        console.error(ErrorMessagesConstants.requestConflict);
        break;
      case 403:
        console.error(ErrorMessagesConstants.forbidden);
        break;
      case 404:
        console.error(ErrorMessagesConstants.notFound);
        break;
      case 405:
        console.error(ErrorMessagesConstants.methodNotAllowed);
        break;
      case 429:
        console.error(ErrorMessagesConstants.tooManyRequests);
        break;
      case 500:
        console.error(ErrorMessagesConstants.internalError);
        break;
      default:
        console.error("se presentó un error. código:" + error.status + ". error: " + error.message);
        break;
    }

  }

}
