import { Case } from 'src/app/main/analyst-assignment/models/case.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-generic-data-risk',
  templateUrl: './generic-data-risk.component.html',
  styleUrls: ['./generic-data-risk.component.scss']
})
export class GenericDataRiskComponent implements OnInit {

  @Input() case: Case;

  constructor() { }

  ngOnInit() {
    
  }

}
