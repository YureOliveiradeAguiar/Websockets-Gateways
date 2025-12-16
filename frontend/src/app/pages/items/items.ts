import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { Item } from "@models/item.model";
import { ItemsService } from "@services/item.service";
import { ItemsSocketService } from "@services/items-socket.service";

import { ItemList } from "./item-list/item-list";

@Component({
  selector: 'app-items',
  templateUrl: './items.html',
  styleUrl: './items.scss',
  imports: [ReactiveFormsModule, ItemList, RouterLink],
})
export class Items implements OnInit {

  itemForm!: FormGroup;

  items: Item[] = [];

  constructor(
    private itemsService: ItemsService, // HTTP
    private socketService: ItemsSocketService, // WebSocket
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.itemForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });

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

  submit() {
    if (this.itemForm.invalid) return;

    this.itemsService.create(this.itemForm.value).subscribe({
      next: () => {
        this.itemForm.reset();
      },
    });
  }
}
