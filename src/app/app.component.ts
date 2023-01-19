import { Component, OnInit } from '@angular/core';
import { SpinnerService } from './services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'AngularTask';
  isLoading = true;
  constructor(private spinnerService: SpinnerService) {}
  ngOnInit(): void {
    this.spinnerService.loading.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }
}
