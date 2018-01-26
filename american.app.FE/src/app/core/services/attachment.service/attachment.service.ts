import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class AttachmentService {

  constructor(private http: Http) { }


  public upload(body, fileName, options): Observable<any> {
    return this.http.post('http://localhost:5000/api/attachments/upload?fileName=' + fileName, body, options)
      .map(response => {
        return response.json();
      })
      .catch(this.handleError);
  }



  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }

}
