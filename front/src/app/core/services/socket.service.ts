import { Injectable } from '@angular/core';
import { Observable} from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import * as io from 'socket.io-client';
import {BehaviorSubject} from "rxjs";

@Injectable()
export class SocketService {

  private _url = environment.endpointSocket;
  private _socket: any;
  private _rooms: Object = {};
  private _options = {
    secure: false,
    reconnection: true,
    reconnectionDelay: 500,
    reconnectionDelayMax: 3000,
    query: { token: this._extractToken() }
  };

  constructor() { }

  private _extractToken() {
    return localStorage.getItem('tkn');
  }

  private initialize(){
    this._socket.on('disconnect', ()=>{
      console.error('[WebSocket]: your are disconnected from the socket');
    });
    this._socket.on('error', (err) => {
      console.error('[WebSocket]: Error', err);
    });
  }

  public connect(successCB, errorCB){
    this._socket = io.connect(this._url, Object.assign({},this._options));
    let reconnectPrepared = false;
    this._socket.on('connect', () => {
      if(!reconnectPrepared){ // do only once connection behaviour
        this._socket.emit('authenticate', {token: this._extractToken()})
          .on('authenticated', () => {
            console.log('socket said authenticated');
            this.initialize();
            successCB({error:false});
          })
          .on('unauthorized', (msg) => {
            console.log("unauthorized: " + JSON.stringify(msg.data));
            this._socket.disconnect();
            errorCB({error: true});
          })
          .on('reconnect', ()=>{
            // define only once reconnect behaviour
            this._socket.emit('authenticate',{tkn: this._extractToken()});
            if(!reconnectPrepared){
              reconnectPrepared = true;
              this._socket.on('authenticated', ()=>{
                this._socket.emit('room:join', Object.keys(this._rooms));
              });
            }
          });
      }
    });
  }

  public disconnect(){
    this._socket.disconnect();
  }

  public emit(tag: string, data: string){
    this._socket.emit(tag, data);
  }

  public getSocketStatusStream(){
    let observable = BehaviorSubject.create( observer => {
      this._socket.on('disconnect', ()=>{
        observer.next(false);
      });
      this._socket.on('connected', ()=>{
        observer.next(true);
      });
      observer.next(this._socket.connected);
    });
    return observable;
  }

  public on(tag: string, fn: Function){
    this._socket.on(tag, fn);
    return () => {
      this._socket.removeListener(tag, fn);
    }
  }

 public join(tags: Array<string>): Array<any> {
    let fn;
    // set the update observable stream
    this._socket.emit('room:join', tags['0']);
    let rooms = {};

    tags.forEach((tag) => {
      this._rooms[`${tag}`] = {
        subject: new BehaviorSubject('no initial value').filter(d=> d !== 'no initial value'),
        length : 1
      };

      this._rooms[tag].subject.forceUpdate = ()=>{
        this._socket.emit(`room:force`, [tag]);
      }

      rooms[tag] = this._rooms[tag].subject;
      this._socket.on(`${tag}:update`, (data)=>{
        console.log('in update', data)
        if(this._rooms[tag]) this._rooms[tag].subject.next(data)
        else console.info('left during update', this._rooms);
      });

    });

    console.log('rooms', rooms);
    return [rooms];
    // tags.forEach((tag)=>{
    //   if(!this._rooms[tag]) {

    //     this._socket.emit(`room:force`, [tag]);
        
    //     this._rooms[`${tag}`] = {
    //       subject: new BehaviorSubject('no initial value').filter(d=> d !== 'no initial value'),
    //       length : 1
    //     };

    //     this._rooms[tag].subject.forceUpdate = ()=>{
    //       this._socket.emit(`room:force`, [tag]);
    //     };

    //     rooms[tag] = this._rooms[tag].subject;
    //     this._socket.on(`${tag}:update`, (data)=>{
    //       console.log('in update', data)
    //       if(this._rooms[tag]) this._rooms[tag].subject.next(data)
    //       else console.info('left during update', this._rooms);
    //     })
        
    //   } else {
    //     this._rooms[tag].length++;
    //     this._rooms[tag] = this._rooms[tag].subject;
    //   }
    // });

    // // return the update stream and close method
    // return [rooms, () => {
    //   tags.forEach((tag) => {
    //     console.log('in final return', tag);
    //     this._rooms[tag].length--;
    //     if(this._rooms[tag].length == 0){
    //       this._socket.emit('room:leave', tag);
    //       this._socket.removeAllListeners(`${tag}:update`)
    //       delete this._rooms[tag];
    //     }
    //   });
    // }];
  }


  public handleRoomUpdate(tag){
    return (data) => {
      this._rooms[tag].forEach(function(fn) {
        fn(data);
      });
    }
  }

}