import {Injectable} from '@angular/core'
import {Router} from "@angular/router";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { HttpService } from './http.service';
import { SharedService } from './shared.service';
import { SocketService } from './socket.service';

@Injectable()
export class BucketService {

  constructor(
    private _http: HttpService,
    private _shared: SharedService,
    private _router: Router,
    private _socket: SocketService
  ) { }

  getBuckets(): Observable<any> {
    return this._http.get('/buckets').flatMap((data) => {
      return Observable.of(data);
    });
  }

  getBucket(id: number): Observable<any> {
    return this._http.post('/buckets/:id', { id: id}).flatMap((data) => {
      return Observable.of(data);
    });
  }

  createBucket(bucketData): Observable<any> {
    return this._http.post('/buckets/', bucketData).flatMap((data) => {
      return Observable.of(data);
    });
  }

  createLink(linkData): Observable<any> {
     return this._http.post('/links/', linkData).flatMap((data) => {
      return Observable.of(data);
    });
  }

}