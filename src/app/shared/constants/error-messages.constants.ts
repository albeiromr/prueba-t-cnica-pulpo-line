/**
 * contiene mensajes de error para mostrar al usuario
 */
export class ErrorMessagesConstants {

    // http
    public static readonly badRequest: string = "los parámetros recibidos no cumplen con el formato solicitado";
    public static readonly requestConflict: string = "La solicitud no se puede completar debido a un conflicto con el estado actual del recurso";
    public static readonly forbidden: string = "No cuenta con autorización para realizar la acción";
    public static readonly notFound: string = "El recurso no fue encontrado";
    public static readonly methodNotAllowed: string = "El método de solicitud no está permitido para el recurso solicitado.";
    public static readonly tooManyRequests: string = "Se han enviado demasiadas solicitudes en un corto período de tiempo..";
    public static readonly internalError: string = "Se ha producido un error interno, por favor intentelo nuevamente mas tarde";


    //environment
    public static readonly backendHostReadingError: string = "Error al leer el host del backend";

    //localStorage
    public static readonly accessTokenReadingError: string = "Error al leer access token";
    public static readonly localStorageItemSavingError: string = 'Error al guardar el item en el localstorage: '
    public static readonly localStorageItemReadingError: string = 'Error al consultar consultar el item en el localstorage:'

}