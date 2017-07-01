import {Injectable} from '@angular/core'
import {Router} from "@angular/router";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { HttpService } from './http.service';
import { SharedService } from './shared.service';
import { SocketService } from './socket.service';

@Injectable()
export class AuthService {

  private _rooms: any;

  constructor(
    private _http: HttpService,
    private _shared: SharedService,
    private _router: Router,
    private _socket: SocketService
  ) { }


  public authResolver(currentUser: any): Observable<any> {
    let observable = new Observable(observer => {
      this._socket.connect((success) => {
        console.info('Socket connected && authenticated');
        this.joinGeneralData();
        this._shared.setData('isLoggedIn', true);
        observer.next(currentUser);
      }, (error) => {
        console.log(error);
        this._shared.setData('isLoggedIn', false);
        this._shared.clearData('currentUser');
        observer.error(error);
      });
    });
    return observable;
  }

  public login(data: any): Observable<any> {
    return this._http.post('/auth', {
      email: data.email,
      password: data.password
    }).flatMap((resp) => {
      localStorage.setItem('tkn', resp.headers.get('authorization'));
      console.log(resp.data);
      this._shared.setData('currentUser', resp.data.token);
      return this.authResolver(resp.data.token);
    });
  }

  public logout(): Observable<any> {
    return this._http.delete('/auth').flatMap((data) => {
      localStorage.removeItem('tkn');
      this._router.navigate(['/home']);
      this._shared.setData('isLoggedIn', false);
      this._shared.clearData('currentUser');
      this._socket.disconnect();
      return Observable.of({});
    });
  }

  public forgot(data: any): Observable<any> {
    return this._http.post('/auth/forgot', data).flatMap((data) => {
      //apply anything relevant to successful forgot
      return Observable.of(data);
    })
  }

  public register(data:any): Observable<any> { // TODO: client sanitazation and form error handling
    return this._http.post('/users/', data).flatMap((data) => {
      //apply anything relevant to successful register
      return Observable.of(data);
    })
  }

  public joinGeneralData() {
    [this._rooms] = this._socket.join(['generalData']);
    this._rooms.generalData.subscribe((data) => {
      console.log('data', data)
      this._shared.setData('currentUser', data);
      return Observable.of(data);
    });
  }

  public pingAuth(): Observable<any> {
    return this._http.get('/auth/ping').flatMap((resp) => {
      if(!resp.data.errors){
        this._shared.setData('currentUser', resp.data.payload);
        return this.authResolver(resp.data.payload);
      } else {
        console.info('[Auth] No token detected');
        return Observable.of(null);
      }
    });
  }

  public isLoggedIn(): boolean {
    return this._shared.getData('isLoggedIn');
  }

  public isLoggedInAsync(): Observable<boolean> {
    return this._shared.get('isLoggedIn');
  }

}