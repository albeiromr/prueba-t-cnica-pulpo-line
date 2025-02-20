export namespace WeatherInterfaces {

    /**
     * Contrato de parametros que debe tener el método que 
     * actualiza las coincidencias de ciudades en el autocompletado
     */
    export interface AutoCompleteCompleteEvent {
        originalEvent: Event;
        query: string;
    }
}