import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { skip } from 'rxjs';
import { Employee } from '../models/employee.model';
import { FilterParams } from '../models/filter-params.model';
import { EmployeesService } from '../services/employees.service';
import { SpinnerService } from '../services/spinner.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];
  employeesFiltered: Employee[] = [];

  filterParams: FilterParams = {};
  filterParamsKeys: string[] = [];
  constructor(
    private employeeService: EmployeesService,
    private route: ActivatedRoute,
    private spinnerService: SpinnerService
  ) {}
  ngOnInit(): void {
    this.getEmployees();
    this.route.queryParams.pipe(skip(1)).subscribe({
      next: (params) => {
        this.filterParams = {};
        if (params['name']) {
          this.filterParams.name = params['name'].toLowerCase();
        }
        if (params['department']) {
          this.filterParams.department = params['department'];
        }
        if (params['salary']) {
          this.filterParams.salary = Number(params['salary']);
        }
        if (params['expereince']) {
          this.filterParams.expereince = params['expereince'];
        }
        if (params['date']) {
          this.filterParams.date = params['date'];
        }
        console.log('this.filterParams', this.filterParams);
        this.filterEmployees();
      },
      error: (err) => {},
    });
  }
  getEmployees() {
    this.spinnerService.loading.next(true);
    this.employeeService.getEmployees().subscribe({
      next: (res) => {
        this.employees = res;
        this.employeesFiltered = this.employees;
        this.spinnerService.loading.next(false);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  filterEmployees() {
    console.log(this.filterParams);
    console.log(this.employees);
    console.log(this.employeesFiltered);
    this.employeesFiltered = this.employees.filter((emp) => {
      let isValid = true;
      for (let key of Object.keys(this.filterParams)) {
        if (key == 'name') {
          if (
            !this.compareName(emp['name'], this.filterParams['name'] as string)
          ) {
            isValid = false;
            console.log('Thats me', key);
          }
        } else if (key == 'salary') {
          if (
            !this.compareSalary(
              emp['salary'],
              this.filterParams['salary'] as number
            )
          ) {
            isValid = false;
            console.log('Thats me', key);
          }
        } else if (key == 'department') {
          if (
            !this.compareDepartment(
              emp['department'],
              this.filterParams['department'] as string
            )
          ) {
            isValid = false;
            console.log('Thats me', key);
          }
        } else if (key == 'date') {
          if (
            !this.compareJoinDate(
              new Date(emp['date']),
              new Date(Number(this.filterParams['date']))
            )
          ) {
            isValid = false;
            console.log('Thats me', key);
          }
        } else if (key == 'expereince') {
          if (
            !this.compareExpereinces(
              emp['expereince'],
              String(this.filterParams['expereince'])
            )
          ) {
            isValid = false;
            console.log('Thats me', emp['expereince']);
          }
        }
      }
      console.log('is Valied', isValid);
      return isValid;
    });
    this.spinnerService.loading.next(false);
  }
  compareName(name1: string, name2: string) {
    return name1.toLowerCase().includes(name2.toLowerCase());
  }
  compareSalary(salary1: number, salary2: number) {
    return salary1 == salary2;
  }
  compareDepartment(dep1: string, dep2: string) {
    return dep1 == dep2;
  }
  compareJoinDate(date1: Date, date2: Date) {
    return (
      date1.getDay() == date2.getDay() &&
      date1.getMonth() == date2.getMonth() &&
      date1.getFullYear() == date2.getFullYear()
    );
  }
  compareExpereinces(exp1: number, exp2: string) {
    let isValid1 = false;
    let isValid2 = false;
    let isValid3 = false;
    for (let ex of exp2.split(',')) {
      if (ex[0] == 'L') {
        isValid1 = exp1 < 1;
        // return exp1 < 1;
      }
      if (ex[0] == 'F') {
        isValid2 = exp1 >= 1 && exp1 < 3;
        // return exp1 >= 1 && exp1 < 3;
      }
      if (ex[0] == '3') {
        isValid3 = exp1 >= 3;
        // return exp1 >= 3;
      }
    }
    return isValid1 || isValid2 || isValid3;
  }
}
