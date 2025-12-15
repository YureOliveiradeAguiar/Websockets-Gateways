import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

import { Item } from "./entities/item.entity";

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ItemsGateway {
  @WebSocketServer()
  server: Server;

  itemCreated(item: Item) {
    this.server.emit('item.created', item);
  }

  itemUpdated(item: Item) {
    this.server.emit('item.updated', item);
  }

  itemDeleted(id: number) {
    this.server.emit('item.deleted', id);
  }
}
