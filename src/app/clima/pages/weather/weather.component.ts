import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { WeatherService } from '../../services/weather.service';
import { ToastService } from '../../../shared/services/toast.service';
import { WeatherModels } from '../../models/weather-models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})
export class WheatherComponent implements OnInit {

  public cityCoincidenses: WeatherModels.CityCoincidence[];

  constructor(
    private weatherService: WeatherService,
    private toastService: ToastService
  ){}


  ngOnInit(): void {
    this.getCityCoincidenses();
  }


  getCityCoincidenses(){
    this.weatherService.searchAndAutoCompleteCity("med").subscribe(data => {
      console.log(data);
    });
  }
}
