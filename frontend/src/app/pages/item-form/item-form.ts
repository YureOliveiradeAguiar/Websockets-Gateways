import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { Item } from "@models/item.model";
import { ItemsService } from "@services/item.service";
import { ItemsSocketService } from "@services/items-socket.service";

import { InputField } from "src/app/components/input-field/input-field";
import { SnackbarService } from "src/app/components/snackbar/snackbar.service";

import { nameValidator } from "./item.validators";

@Component({
  selector: 'item-form',
  templateUrl: './item-form.html',
  styleUrl: './item-form.scss',
  imports: [ReactiveFormsModule, RouterLink, CommonModule, InputField],
})
export class ItemForm implements OnInit {

  formGroup!: FormGroup;

  items: Item[] = [];

  constructor(
    private itemsService: ItemsService, // HTTP
    private socketService: ItemsSocketService, // WebSocket
    private formBuilder: FormBuilder,
    private snackbar: SnackbarService
  ) {}

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      name: ['', nameValidator()],
      description: ['', Validators.required],
    });

    //console.log (this.formGroup);

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

  get name(): AbstractControl<any, any, any> | null {
    return this.formGroup.get('name');
  }

  get size(): AbstractControl<any, any, any> | null {
    return this.formGroup.get('size');
  }

  submit() {
    if (this.formGroup.invalid) return;

    this.formGroup.markAllAsTouched();

    this.itemsService.create(this.formGroup.value).subscribe({
      next: () => {
        this.formGroup.reset();
        this.snackbar.show("Item created with success", 'success', 3000);
      },
      error: (err) => {
        //console.log(err);
        if (err.status === 400) {
          this.snackbar.show("Data is invalid", 'warning', 5000);
        } else {
          this.snackbar.show("Failed to communicate with the server", 'error', 5000);
        }
      }
    });
  }

  test(): void {
    console.log(this.formGroup);
  }
}
