import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { HistoryModels } from '../../../shared/models/history-models';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { LocalStorageConstants } from '../../../shared/constants/local-storage.constants';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { RouterConstans } from '../../../shared/constants/router.constants';
import { SelectedCityService } from '../../../shared/services/selected-city.service';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CardModule, DividerModule, TableModule, CommonModule, ButtonModule ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent implements OnInit{

  historyItems: HistoryModels.Item[] = [];

  constructor(
    private localStorageService: LocalStorageService,
    private selectedCityService: SelectedCityService,
    private router: Router
  ){}

  ngOnInit(): void {
    const history = this.localStorageService.getItem<HistoryModels.Item[]>(LocalStorageConstants.history, true);

    if(!history) {
      this.historyItems = [];
      return;
    }

    this.historyItems = history.reverse();
  }

  goToSearchPage(): void {
    this.router.navigate([RouterConstans.weather]);
  }

  searchCityAgain(city: string): void {
    this.selectedCityService.setCity = city;
    this.router.navigate([RouterConstans.weather]);
  }

}
