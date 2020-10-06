import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Person } from '../person-management/models/person.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { apiRoutes } from 'src/constants/api-routes';

@Injectable({
  providedIn: 'root'
})
export class InifyPeopleService {

  constructor(private httpClient: HttpClient) { }

  private readonly baseUrl = `${environment.server.api.baseUrl}/${apiRoutes.base}`;

  public addedPeople: Person[] = [];
  public addedPeopleSource$ = new BehaviorSubject<Person[]>(this.addedPeople);
  addedPeople$ = this.addedPeopleSource$.asObservable();

  public groupPerson: Person;
  public groupPersonSource$ = new BehaviorSubject<Person>(this.groupPerson);
  groupPerson$ = this.groupPersonSource$.asObservable();

  addPeopleGroup(idGroupPerson: number, idsPeopleAdded: number[]){
    const url = `${this.baseUrl}/${apiRoutes.group.base}`;
    const groupJson = {
      idGroupPerson: idGroupPerson,
      idsPeopleAdded: idsPeopleAdded
    };
     return this.httpClient.post(url, groupJson);
  }

}
