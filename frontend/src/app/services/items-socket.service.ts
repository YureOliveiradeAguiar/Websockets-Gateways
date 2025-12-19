import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { io, Socket } from "socket.io-client";

import { Item } from "../../models/item.model";

@Injectable({
  providedIn: 'root',
})
export class ItemsSocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000'); // Nest backend
  }

  onItemCreated(): Observable<Item> {
    return new Observable((observer) => {
      this.socket.on('itemCreated', (item: Item) => {
        observer.next(item);
      });
    });
  }

  onItemUpdated(): Observable<Item> {
    return new Observable((observer) => {
      this.socket.on('itemUpdated', (item: Item) => {
        observer.next(item);
      });
    });
  }

  onItemDeleted(): Observable<string> {
    return new Observable((observer) => {
      this.socket.on('itemDeleted', (id: string) => {
        observer.next(id);
      });
    });
  }
}
