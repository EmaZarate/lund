import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProducerManagementService } from '../../producer-management.service';
import { Producer } from '../../models/Producer';
import { Location } from '@angular/common';

@Component({
  selector: 'app-producer-management-detail',
  templateUrl: './producer-management-detail.component.html',
  styleUrls: ['./producer-management-detail.component.scss']
})
export class ProducerManagementDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private producerService: ProducerManagementService,
    private location: Location ) { }
  
  producer: Producer;

  ngOnInit() {
    this.producerService.getById(this.route.snapshot.params.id).subscribe(res =>{
       this.producer = res;
    })
  }

  back(){
     this.location.back();
  }

}
