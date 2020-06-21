import { Injectable } from '@angular/core';
import {Leader} from '../shared/leader'
import { LEADERS } from '../shared/leaders';

import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { catchError } from 'rxjs/operators';
import { ProcessHttpmsgService } from './process-httpmsg.service';


@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient, private processHTTPMsgService: ProcessHttpmsgService) {

  }
  //  return new Promise(resolve=> {
  //   // Simulate server latency with 2 second delay
  //     setTimeout(() => resolve(DISHES.filter((dish) => (dish.id === id))[0]), 2000);
  // });
   getLeader(): Observable<Leader[]> {
    return this.http.get<Leader[]>(baseURL + 'leadership')
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.http.get<Leader>(baseURL + 'leadership?featured=true').pipe(map(dishes => dishes[0]))
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

}
