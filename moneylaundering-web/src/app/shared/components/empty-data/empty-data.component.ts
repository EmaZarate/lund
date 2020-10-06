import { Observable } from 'rxjs';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-empty-data',
  templateUrl: './empty-data.component.html',
  styleUrls: ['./empty-data.component.scss']
})
export class EmptyDataComponent implements OnInit {

  @Input() title: string = "No hay datos";
  @Input() message: string = "";
  @Input() sizeBig: boolean = true;
  @Input() data: Observable<any[]> = new Observable();
  @Output() canDisplay: EventEmitter<boolean> = new EventEmitter();
    
  constructor() { }

  ngOnInit() {
   
  }

  // checkForData() {
  //   this.data.subscribe(items => {
  //     console.log('in');
  //     if (items.length > 0) {
  //       console.log(items);
  //       this.canDisplay.emit(false)
  //     }
  //     else {
  //       this.canDisplay.emit(true);
  //     }
  //   })
  // }
}
