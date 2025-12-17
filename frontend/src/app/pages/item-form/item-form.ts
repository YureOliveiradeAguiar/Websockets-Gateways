import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { Item } from "@models/item.model";
import { ItemsService } from "@services/item.service";
import { ItemsSocketService } from "@services/items-socket.service";

import {
  SegmentedControl, SegmentedControlOption
} from "src/app/components/segmented-control/segmented-control";
import { SnackbarService } from "src/app/components/snackbar/snackbar.service";
import { Toggle } from "src/app/components/toggle/toggle";

@Component({
  selector: 'item-form',
  templateUrl: './item-form.html',
  styleUrl: './item-form.scss',
  imports: [ReactiveFormsModule, RouterLink, SegmentedControl, Toggle],
})
export class ItemForm implements OnInit {

  itemQualities: SegmentedControlOption[]= [
    {label:"low", value: "low"},
    {label:"medium", value: "medium"},
    {label:"high", value: "high"}
  ];

  itemQuality = "low";

  isPremium: boolean = false;

  itemForm!: FormGroup;

  items: Item[] = [];

  constructor(
    private itemsService: ItemsService, // HTTP
    private socketService: ItemsSocketService, // WebSocket
    private formBuilder: FormBuilder,
    private snackbar: SnackbarService
  ) { }

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

  test(): void {
    this.snackbar.show("Data saved successfully", 'success', 20002222);
  }
}
