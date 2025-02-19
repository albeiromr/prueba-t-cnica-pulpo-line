import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastSeverityEnum } from '../enums/toast-severity.enum';

@Injectable({
  providedIn: 'root',
})
export class ToastService {

  constructor(private messageService: MessageService) { }

  /**
   * Muestra una notificación toast en la pantalla según las configuraciones que
   * se le entrguen como parámetros.
   * @param severity tipo de notificación, exitosa, notificación de error, etc
   * @param detail Mensaje completo que estará en la notificación
   * @param sticky true si el mensaje debe permanecer abierto hasta que el usuario lo cierre
   * o false si se debe cerrar solo, si no se ingresa su valor por defecto es false
   */
  public showToast(severity: ToastSeverityEnum, detail: string, sticky: boolean = false): void {
    let summary: string;

    switch (severity) {
      case ToastSeverityEnum.success:
        summary = "Operación exitosa!"
        break;
      case ToastSeverityEnum.info:
        summary = "Gracias!"
        break;
      case ToastSeverityEnum.warn:
        summary = "Atención!"
        break;
      case ToastSeverityEnum.error:
        summary = "Lo sentimos!"
        break;
      default:
        summary = "";
        break;
    }
    this.messageService.add({ severity, summary, detail, life: 5000, sticky });
  }
}
