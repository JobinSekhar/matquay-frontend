import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EmployeeService} from "./service/employeeService";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  employeeForm: FormGroup;
  employees:any

  constructor(
      private formBuilder: FormBuilder,
      private empService: EmployeeService) {
  }

  ngOnInit() {
    this.employeeForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      zipCode: ['', Validators.required],
      department: ['', Validators.required],
    });
    this.getEmployeesList();
  }

  onSubmit() {
    this.empService.addEmployee(this.employeeForm.value).pipe(first())
        .pipe().subscribe(
            data => {
             console.log("success")
            });
  }

  getEmployeesList() {
      this.empService.getEmployeeList().pipe(first())
          .pipe().subscribe(
          data => {
              this.employees = data;
          });
  }

  deleteEmployee(employeeId) {
      this.empService.deleteEmployee(employeeId).pipe(first())
          .pipe().subscribe(
          data => {
              console.log("Success")
              this.getEmployeesList();
          });
  }
}
