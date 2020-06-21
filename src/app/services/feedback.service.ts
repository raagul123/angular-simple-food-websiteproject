import { Injectable, Inject } from '@angular/core';
import { baseURL } from '../shared/baseurl';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ProcessHttpmsgService } from './process-httpmsg.service';
import { Observable, of } from 'rxjs';
import { Feedback } from '../shared/feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  
  constructor(private http:HttpClient, private processHTTPMsgService: ProcessHttpmsgService) { }
  submitFeedback(feedback: Feedback):Observable<Feedback>{
    return this.http.post<Feedback>(baseURL+'feedback',feedback)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
