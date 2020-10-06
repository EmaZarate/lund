import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor() { }

  public loading: boolean = false;
  public loadingSource$ = new BehaviorSubject<boolean>(this.loading);
  public loading$ = this.loadingSource$.asObservable();


  setLoading(loading: boolean){
    this.loading = loading;
    this.loadingSource$.next(this.loading);
  }
}
