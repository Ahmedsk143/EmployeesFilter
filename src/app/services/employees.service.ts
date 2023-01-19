import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Employee } from '../models/employee.model';
@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  employees: Employee[] = [
    {
      name: 'Ahmed',
      date: new Date('December 20, 2022 20:17:40 GMT+00:00'),
      expereince: 1,
      salary: 9000000,
      department: 'Administration',
    },
    {
      name: 'Mahmoud',
      date: new Date('Augest 1, 2022 20:17:40 GMT+00:00'),
      expereince: 0.5,
      salary: 9000,
      department: 'Administration',
    },
    {
      name: 'Mohamed',
      date: new Date('Febuary 10, 2022 20:17:40 GMT+00:00'),
      expereince: 0.8,
      salary: 8000,
      department: 'Human resources',
    },
    {
      name: 'Ali',
      date: new Date('December 15, 2022 20:17:40 GMT+00:00'),
      expereince: 1.5,
      salary: 12000,
      department: 'Marketing',
    },
    {
      name: 'Khalil',
      date: new Date('April 13, 2022 20:17:40 GMT+00:00'),
      expereince: 10,
      salary: 400000,
      department: 'Marketing',
    },
    {
      name: 'Sayed',
      date: new Date('July 10, 2022 20:17:40 GMT+00:00'),
      expereince: 2,
      salary: 18000,
      department: 'Marketing ',
    },
    {
      name: 'Khalil',
      date: new Date('Mar 14,2022 20:17:40 GMT+00:00'),
      expereince: 3,
      salary: 23000,
      department: 'Human resources',
    },
    {
      name: 'Ahmed',
      date: new Date('June 2, 2022 20:17:40 GMT+00:00'),
      expereince: 5,
      salary: 30000,
      department: 'Customer service',
    },
  ];

  constructor() {}
  // Mocking an API call
  getEmployees() {
    return of(this.employees);
  }
}
