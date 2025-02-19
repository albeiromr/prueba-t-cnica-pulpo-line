import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})
export class WheatherComponent {

}
