import {Injectable} from '@angular/core'
import {Router} from "@angular/router";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { HttpService } from './http.service';
import { SharedService } from './shared.service';
import { SocketService } from './socket.service';

@Injectable()
export class AuthService {

  private _generalData;

  constructor(
    private _http: HttpService,
    private _shared: SharedService,
    private _router: Router,
    private _socket: SocketService
  ) { }


  public authResolver(currentUser: any): Observable<any> {
    let observable = new Observable(observer => {
      this._socket.connect((success) => {
        console.info('Socket connected');
        this.joinGeneralData();
        this._shared.setData('isLoggedIn', true);
        observer.next(currentUser);
      }, (error) => {
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
      this._shared.setData('currentUser', resp.data.payload);
      return this.authResolver(resp.data.payload);
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
    console.log('before post register', data);
    return this._http.post('/auth/register', data).flatMap((data) => {
      //apply anything relevant to successful register
      return Observable.of(data);
    })
  }

  public joinGeneralData() {
    [this._generalData] = this._socket.join(['generalData']);
    this._generalData.subscribe(data => {
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