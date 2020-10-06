import { LoadingService } from './../../../../core/services/loading.service';
 
import { SelectStateService } from 'src/app/shared/services/select-state.service';
import { StateModel } from 'src/app/shared/models/state.model';
import { SelectLocationService } from 'src/app/shared/services/select-location.service';
import { LocationModel } from 'src/app/shared/models/location.model';
import { Case } from 'src/app/main/analyst-assignment/models/case.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AnalystAssignmentService } from '../../analyst-assignment.service';
import { Person } from 'src/app/main/person-management/models/person.model';
import { PersonService } from 'src/app/main/person-management/person.service';

@Component({
  selector: 'app-analyst-assignment-detail',
  templateUrl: './analyst-assignment-detail.component.html',
  styleUrls: ['./analyst-assignment-detail.component.scss']
})
export class AnalystAssignmentDetailComponent implements OnInit {

  @Output() button = new EventEmitter<any>();
  isNewCase: boolean;

  case: Case;
  person: Person;
  title;
  states: StateModel[];
  state: StateModel;
  locations: LocationModel[];
  location: LocationModel;
  navigateUrl: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private analystassignmentService: AnalystAssignmentService,
    private personService : PersonService,
    private ldg: LoadingService
  ) { }

  ngOnInit() {
    this.ldg.setLoading(true);
    this.getCase(this.route.snapshot.params.id);
  }

  handleButtonClick() {
    this.button.emit(
      this.navigateToList()
    );
  }

  private getCase(id: number) {
      this.analystassignmentService.getCase(id).subscribe(res => {
      this.case = res;
      this.personService.getById(this.case.person.id).subscribe(res => {
        this.person = res;
        this.ldg.setLoading(false);
        this.navigateUrl='/person-management/' + this.person.id + '/detail2';
      });
    })
  }

  private navigateToList() {
        this.router.navigate(['../analyst-assignment']);
  }
}
