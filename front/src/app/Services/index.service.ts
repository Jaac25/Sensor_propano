import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class IndexService {

  constructor(
    private http : HttpClient
  ) { }

  getDataSensor(): Observable<{value: number, date: Date}[]> {
    return this.http.get<{value: number, date: Date}[]>(URL+"/data")
  }
}
