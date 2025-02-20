import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { HistoryModels } from '../../../shared/models/history-models';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { LocalStorageConstants } from '../../../shared/constants/local-storage.constants';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CardModule, DividerModule, TableModule, CommonModule, ButtonModule ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent implements OnInit{

  historyItems: HistoryModels.Item[] = [];

  constructor(private localStorageService: LocalStorageService){}

  ngOnInit(): void {
    const history = this.localStorageService.getItem<HistoryModels.Item[]>(LocalStorageConstants.history, true);
    this.historyItems = history;
    console.log(this.historyItems);
  }

}
