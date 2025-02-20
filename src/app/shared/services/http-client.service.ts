import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { ErrorHandlingService } from './error-handling.service';
import { LocalStorageConstants } from '../constants/local-storage.constants';
import { environment } from '../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { ErrorMessagesConstants } from '../constants/error-messages.constants';

@Injectable({
  providedIn: 'root'
})
/**
 * Contiene métodos que permiten realizar solicitudes http 
 */
export class HttpClientService {

  private backendHost: string;

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService,
    private errorHandlingService: ErrorHandlingService
  ) {

    //obteniendo el host del backend
    const host = environment.backendHost;
    if (host && host.trim().length > 0) this.backendHost = host;
    else console.error(ErrorMessagesConstants.backendHostReadingError);
  }

  /**
   * consulta el access token del usuarion en el local Setorage
   * @returns token del usuario
   */
  private getAccessToken(): string {
    let result: string = "";
    const token = this.localStorageService.getItem<string>(LocalStorageConstants.accessToken, false);
    if (token && token.trim().length > 0) result = token;
    else return ""; // solución temporal
    return result;
  }

  /**
   * envía una solicitud http de tipo get al backend, no incluye parametros
   * @param endpoint url del endpoint a consultar
   * @param isTokenRequired si se requiere o no enviar el access token en los headers
   * @param host la url base del servidor backens
   * @param aditionalHeaders objeto con headers adicionales, son opcionales
   * @returns retorna un observable al que nos podemos subscribir para leer los datos retornados por el endpoint
   */
  public sendGetRequest<T>(endpoint: string, isTokenRequired: boolean = true, host: string = this.backendHost, aditionalHeaders: object = {}): Observable<T> {
    let headers: any;

    if (isTokenRequired) headers = {
      'Authorization': "Bearer " + this.getAccessToken(),
      ...aditionalHeaders
    };

    if (!isTokenRequired) headers = {
      ...aditionalHeaders
    };

    return this.httpClient.get<T>(`${host}${endpoint}`, { headers })
      .pipe(catchError(err => {
        this.errorHandlingService.handleHttpError(err)
        return throwError(() => err);
      }));
  }

  /**
   * envía una solicitud http con un parámetro al backend
   * @param endpoint url del endpoint a consultar
   * @param resourceId  id del recurso a consultar
   * @param isTokenRequired si se requiere o no enviar el access token en los headers
   * @param host la url base del servidor backens
   * @param aditionalHeaders objeto con headers adicionales, son opcionales
   * @returns retorna un observable al que nos podemos subscribir para leer los datos retornados por el endpoint
   */
  public sendGetRequestWithResourceId<T>(endpoint: string, resourceId: string | number, isTokenRequired: boolean = true, host: string = this.backendHost, aditionalHeaders: object = {}): Observable<T> {
    let headers: any;

    if (isTokenRequired) headers = {
      'Authorization': "Bearer " + this.getAccessToken(),
      ...aditionalHeaders
    };

    if (!isTokenRequired) headers = {
      ...aditionalHeaders
    };

    return this.httpClient.get<T>(`${host}${endpoint}/${resourceId}`, { headers })
      .pipe(catchError(err => {
        this.errorHandlingService.handleHttpError(err)
        return throwError(() => err);
      }));
  }

  /**
   * envía una solicitud http de tipo post al backend
   * @param endpoint url del endpoint a consultar
   * @param payload el body de la solicitud
   * @param isTokenRequired si se requiere o no enviar el access token en los headers
   * @param host la url base del servidor backens
   * @param aditionalHeaders retorna un observable al que nos podemos subscribir para leer los datos retornados por el endpoint
   * @returns retorna un observable al que nos podemos subscribir para leer los datos retornados por el endpoint
   */
  public sendPostRequest<T>(endpoint: string, payload: object, isTokenRequired: boolean = true, host: string = this.backendHost, aditionalHeaders: object = {}): Observable<T> {
    let headers: any;

    if (isTokenRequired) headers = {
      'Authorization': "Bearer " + this.getAccessToken(),
      'Content-Type': 'application/json',
      ...aditionalHeaders
    };

    if (!isTokenRequired) headers = {
      'Content-Type': 'application/json',
      ...aditionalHeaders
    };

    return this.httpClient.post<T>(`${host}${endpoint}`, JSON.stringify(payload), { headers })
      .pipe(catchError(err => {
        this.errorHandlingService.handleHttpError(err)
        return throwError(() => err);
      }));
  }

  /**
   * envía una solicitud http de tipo put al backend
   * @param endpoint url del endpoint a consultar
   * @param payload el body de la solicitud
   * @param isTokenRequired si se requiere o no enviar el access token en los headers
   * @param host la url base del servidor backends
   * @param aditionalHeaders objeto con headers adicionales, son opcionales
   * @returns retorna un observable al que nos podemos subscribir para leer los datos retornados por el endpoint
   */
  public sendPutRequest<T>(endpoint: string, payload: object, isTokenRequired: boolean = true, host: string = this.backendHost, aditionalHeaders: object = {}): Observable<T> {
    let headers: any;

    if (isTokenRequired) headers = {
      'Authorization': "Bearer " + this.getAccessToken(),
      'Content-Type': 'application/json',
      ...aditionalHeaders
    };

    if (!isTokenRequired) headers = {
      'Content-Type': 'application/json',
      ...aditionalHeaders
    };

    return this.httpClient.put<T>(`${host}${endpoint}`, JSON.stringify(payload), { headers })
      .pipe(catchError(err => {
        this.errorHandlingService.handleHttpError(err)
        return throwError(() => err);
      }));
  }

  /**
   * envía una solicitud http de tipo patch al backend
   * @param endpoint url del endpoint a consultar
   * @param payload el body de la solicitud
   * @param isTokenRequired si se requiere o no enviar el access token en los headers
   * @param host la url base del servidor backends
   * @param aditionalHeaders objeto con headers adicionales, son opcionales
   * @returns retorna un observable al que nos podemos subscribir para leer los datos retornados por el endpoint
   */
  public sendPatchRequest<T>(endpoint: string, payload: object, isTokenRequired: boolean = true, host: string = this.backendHost, aditionalHeaders: object = {}): Observable<T> {
    let headers: any;

    if (isTokenRequired) headers = {
      'Authorization': "Bearer " + this.getAccessToken(),
      'Content-Type': 'application/json',
      ...aditionalHeaders
    };

    if (!isTokenRequired) headers = {
      'Content-Type': 'application/json',
      ...aditionalHeaders
    };

    return this.httpClient.patch<T>(`${host}${endpoint}`, JSON.stringify(payload), { headers })
      .pipe(catchError(err => {
        this.errorHandlingService.handleHttpError(err)
        return throwError(() => err);
      }));
  }

  /**
   * envía una solicitud http de tipo delete al backend
   * @param endpoint url del endpoint a consultar
   * @param resourceId  id del recurso a eliminar
   * @param isTokenRequired si se requiere o no enviar el access token en los headers
   * @param host la url base del servidor backend
   * @param aditionalHeaders objeto con headers adicionales, son opcionales
   * @returns retorna un observable al que nos podemos subscribir para leer los datos retornados por el endpoint
   */
  public sendDeleteRequest<T>(endpoint: string, resourceId: string | number, isTokenRequired: boolean = true, host: string = this.backendHost, aditionalHeaders: object = {}): Observable<T> {
    let headers: any;

    if (isTokenRequired) headers = {
      'Authorization': "Bearer " + this.getAccessToken(),
      ...aditionalHeaders
    };

    if (!isTokenRequired) headers = {
      ...aditionalHeaders
    };

    return this.httpClient.delete<T>(`${host}${endpoint}/${resourceId}`, { headers })
      .pipe(catchError(err => {
        this.errorHandlingService.handleHttpError(err)
        return throwError(() => err);
      }));
  }



}
