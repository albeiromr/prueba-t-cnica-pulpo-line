import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardModule],
  templateUrl: './welcome-back.component.html',
  styleUrl: './welcome-back.component.scss'
})
export class WelcomeBackComponent {

}
