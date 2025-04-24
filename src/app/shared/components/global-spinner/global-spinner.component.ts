import { Component } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-global-spinner',
  standalone: false,
  templateUrl: './global-spinner.component.html',
  styleUrl: './global-spinner.component.scss',
})
export class GlobalSpinnerComponent {
  constructor(public loader: LoaderService) {}
}
