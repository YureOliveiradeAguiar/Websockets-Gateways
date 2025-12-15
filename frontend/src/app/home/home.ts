import { Component, OnInit } from "@angular/core";

import { Item } from "../models/item.model";
import { ItemsService } from "../services/item.service";
import { ItemsSocketService } from "../services/items-socket.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.scss',
  imports: [],
})
export class Home implements OnInit {
  items: Item[] = [];

  constructor(
    private itemsService: ItemsService, // HTTP
    private socketService: ItemsSocketService // WebSocket
  ) {}

  ngOnInit() {
    // Loads initial state via HTTP
    this.itemsService.getAll().subscribe((items) => {
      this.items = items;
    });

    // Listen for real-time creation
    this.socketService.onItemCreated().subscribe((item) => {
      this.items.push(item);
    });
    // Listen for real-time updates
    this.socketService.onItemUpdated().subscribe((updated) => {
      const index = this.items.findIndex(i => i.id === updated.id);
      if (index !== -1) {
        this.items[index] = updated;
      }
    });
    // Listen for real-time deletes
    this.socketService.onItemDeleted().subscribe((id) => {
      this.items = this.items.filter(i => i.id !== id);
    });
  }
}

