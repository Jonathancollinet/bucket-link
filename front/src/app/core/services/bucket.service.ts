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

  getBuckets(): void {}

  getBucket(id: number): void {}



}