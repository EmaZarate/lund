import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, RouterEvent, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { MicrosoftGraphService } from './core/services/microsoft-graph.service';
import { LoadingService } from './core/services/loading.service';
import { FakePossitiveModule } from './main/fake-possitive/fake-possitive.module';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit{
  title = 'frontend';
  isLoading: boolean = false;

  constructor(private router: Router, private msft: MicrosoftGraphService, private loadingService: LoadingService){

    let count = 0;

    this.router.events.subscribe((event : RouterEvent) => {
      if (event instanceof RouteConfigLoadStart) {
        count++;
      }
      else if (event instanceof RouteConfigLoadEnd) {
        count--;
      }

      this.loadingService.setLoading(!! count);
    })
    

  }
  ngOnInit(){
    
  }

  ngAfterViewInit(){
    this.loadingService.loading$.pipe(delay(0)).subscribe(res =>{
      this.isLoading = res;
    })
  }
}
