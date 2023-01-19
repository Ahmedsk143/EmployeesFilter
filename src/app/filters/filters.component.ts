import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { skip } from 'rxjs/operators';
import formData from '../form-data.json';
import { SpinnerService } from '../services/spinner.service';
@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
  collpased: boolean = false;
  departments: string[];
  expereinces: string[];
  name: string | null = null;
  date: Date | null = null;
  salary: number | null = null;
  selectedDep: string | null = null;
  selectedExpereinces: string[] | null = null;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private spinnerService: SpinnerService
  ) {}
  ngOnInit(): void {
    this.departments = formData.departments;
    this.expereinces = formData.experinces;
    this.route.queryParams.pipe(skip(1)).subscribe({
      next: (params) => {
        if (params['name']) {
          this.name = params['name'];
        }
        if (params['department']) {
          this.selectedDep = params['department'];
        }
        if (params['salary']) {
          this.salary = Number(params['salary']);
        }
        if (params['date']) {
          this.date = new Date(Number(params['date']));
        }
        if (params['expereince']) {
          this.selectedExpereinces = [];
          String(params['expereince'])
            .split(',')
            .forEach((e: string) => {
              this.selectedExpereinces!.push(e);
            });

          this.selectedExpereinces = this.selectedExpereinces!.slice();
        }
      },
      error: (err) => {},
    });
  }
  applyFilter() {
    // this.spinnerService.loading.next(true);
    const queryS = this.buildQueryString({
      name: this.name,
      date: this.date ? this.date.getTime() : this.date,
      department: this.selectedDep,
      salary: this.salary,
      expereince: this.selectedExpereinces,
    });
    this.router.navigateByUrl(queryS);
  }

  buildQueryString(params: any) {
    let queryString = '?';
    for (let key of Object.keys(params)) {
      if (params[key]) {
        if (queryString[queryString.length - 1] == '?') {
          queryString += `${key}=${params[key]}`;
        } else {
          queryString += `&${key}=${params[key]}`;
        }
      }
    }
    return queryString[queryString.length - 1] == '?' ? '' : queryString;
  }
  clearForm() {
    this.name = null;
    this.date = null;
    this.selectedDep = null;
    this.salary = null;
    this.selectedExpereinces = null;
  }
}
