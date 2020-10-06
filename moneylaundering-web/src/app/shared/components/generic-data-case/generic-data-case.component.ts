import { ValidatorsService } from './../../services/validators.service';
import { ToastrService } from 'ngx-toastr';
import { IUser } from './../../models/userSelect.interface';
import { User } from 'src/app/shared/models/user.model';
import { UserRoleService } from './../../services/user-role.service';
import { AuthService } from './../../../core/services/auth.service';
import { Case } from 'src/app/main/analyst-assignment/models/case.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-generic-data-case',
  templateUrl: './generic-data-case.component.html',
  styleUrls: ['./generic-data-case.component.scss']
})
export class GenericDataCaseComponent implements OnInit {

  @Input() title: string;
  @Input() case: Case;
  @Input() isNewCase: boolean = false;
  @Input() isReAssigningAnalyst: boolean = false;
  @Input() isChangingExpiration: boolean = false;
  @Input() isFalsePossitive: boolean = false;
  @Output() isValidCaseForm: EventEmitter<any> = new EventEmitter();
  get analystItemForm() { return this.form.get('analystItems') }
  form: FormGroup;
  isDisabled: boolean;
  tomorrow;
  tomorrowdate;
  analyst: IUser[] = [];
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userRoleService: UserRoleService,
    private toastr: ToastrService,
    private customValidators: ValidatorsService,   
    ) {}
  ngOnInit() {
    this.tomorrow = new Date().setDate(new Date().getDate() + 1);
    this.tomorrowdate = new Date(this.tomorrow);
    this.initForm();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.isReAssigningAnalyst) {
      if(changes.case.currentValue != undefined) {
        this.getUserByRole();
      }
    }
  }
  private initForm() {
    this.form = this.fb.group({
      analystItems: [''],
      newexpiration: [''],
      falsepossitive: [''],
    });
    this.onFormInit(this.form);
    this.onFormChanges();
    this.onFormChangesDate();
  }
  onFormInit(form: FormGroup) {
    this.isValidCaseForm.emit(form);
  }
  onFormChanges() {
    this.analystItemForm.valueChanges
      .subscribe(() => {
        
        if (this.analystItemForm.invalid && this.analystItemForm.dirty) {
          this.toastr.warning('Por favor, ingrese un analista diferente al actual')
          this.isValidCaseForm.emit(this.analystItemForm)
        }
        else {
          this.isValidCaseForm.emit(this.analystItemForm);
        }
      });
       
  }
  setCaseValidators() {
    this.analystItemForm.setValidators(Validators.required);
    this.analystItemForm.setValidators(this.customValidators.differentAnalyst(this.case.analystId))
    this.analystItemForm.markAsPristine();
    this.analystItemForm.updateValueAndValidity();
  }

  onFormChangesDate() {
    if (this.isChangingExpiration) {
      this.form.controls['newexpiration'].valueChanges.subscribe(() => {
        this.isValidCaseForm.emit(this.form.controls['newexpiration']);
      })
    }
  }

  onFormChangesStatus() {
    if (this.isFalsePossitive) {
      this.form.controls['falsepossitive'].valueChanges.subscribe(() => {
        this.isValidCaseForm.emit(this.form.controls['falsepossitive']);
      })
    }
  }

  validatorDate(newDate) {
    let today: Date = new Date();
    if (newDate == 0 || newDate == null) {
      return true;
    }
    else {
      if (newDate.getTime() > today.getTime()) {
        return true;
      }
      else {
        return false;
      }
    }
  }
 private getUserByRole() {
    this.authService.user$.subscribe((loggedUser: User) => {
      this.userRoleService.getUserByRoleList(loggedUser.roles)
                          .subscribe((resp: IUser[]) => {
                            resp.forEach((item: IUser) => {
                              let user: IUser = {...item, fullName: item.firstName + ' ' + item.lastName }
                                this.analyst.push(user);
                            });
                            this.setActualUser(this.analyst)
                          });

    });
  }

  private setActualUser(users: IUser[]) {
    users.forEach((user, i) => {
      if (user.userId  === this.case.analystId) {
        this.analystItemForm.setValue(this.analyst[i])
        this.setCaseValidators();
      }   
    })
  }
} 
