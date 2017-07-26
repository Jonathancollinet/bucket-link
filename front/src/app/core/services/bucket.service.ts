import {Injectable} from '@angular/core'
import {Router} from "@angular/router";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { HttpService } from './http.service';
import { SharedService } from './shared.service';
import { SocketService } from './socket.service';

@Injectable()
export class BucketService {

  private _bucketID: number | null = null;
  private _bucketName: string | null;

  constructor(
    private _http: HttpService,
    private _shared: SharedService,
    private _router: Router,
    private _socket: SocketService
  ) { }

  // LOCAL

  setBucketIDForPost(id: number): void {
    this._bucketID= id;
  }

  setBucketName(name: string): void {
    this._bucketName = name;
  }

  getBucketIDForPost(): number {
    return this._bucketID;
  }

  getBucketName(): string {
    return this._bucketName;
  }

  // GET

  getBuckets(): Observable<any> {
    return this._http.get('/buckets').flatMap((data) => {
      return Observable.of(data);
    });
  }

  getUncategorizedLinks(): Observable<any> {
    return this._http.get('/links/recent/uncategorized').flatMap((data) => {
      return Observable.of(data);
    });
  }

  getLinks(): Observable<any> {
    return this._http.get('/links').flatMap((data) => {
      return Observable.of(data);
    });
  }

  getBucket(id: number): Observable<any> {
    return this._http.get(`/buckets/${id}`).flatMap((data) => {
      return Observable.of(data);
    });
  }

  // POST

  createBucket(bucketData: any): Observable<any> {
    return this._http.post('/buckets/', bucketData).flatMap((data) => {
      return Observable.of(data);
    });
  }

  createLink(linkData: any): Observable<any> {
    return this._http.post('/links/', linkData).flatMap((data) => {
      return Observable.of(data);
    });
  }

  createLinkInBucket(id: number, linkData: any): Observable<any> {
    return this._http.post(`/buckets/${id}/links`, linkData).flatMap((data) => {
      return Observable.of(data);
    });
  }

  // PATCH

  patchBucket(id: number, bucketData: any): Observable<any> {
     return this._http.patch(`/buckets/${id}`, bucketData).flatMap((data) => {
      return Observable.of(data);
    });
  }

  patchLink(id: number, linkData: any): Observable<any> {
    return this._http.patch(`/links/${id}`, linkData).flatMap((data) => {
      return Observable.of(data);
    });
  }

  // DELETE

  deleteBucket(id: number): Observable<any> {
    return this._http.delete(`/buckets/${id}`).flatMap((data) => {
      return Observable.of(data);
    });
  }

  deleteLink(id: number): Observable<any> {
     return this._http.delete(`/links/${id}`).flatMap((data) => {
      return Observable.of(data);
    });
  }

}