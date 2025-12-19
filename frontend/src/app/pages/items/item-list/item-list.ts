import { Component, Input } from "@angular/core";
import { IconArrow } from "@assets/icons/arrow.icon";
import { IconDelete } from "@assets/icons/delete.icon";
import { IconEdit } from "@assets/icons/edit.icon";
import { IconOpenBook } from "@assets/icons/open-book.icon";
import { Item } from "@models/item.model";
import { ItemsService } from "@services/item.service";

import { SnackbarService } from "src/app/components/snackbar/snackbar.service";

@Component({
  selector: 'item-list',
  imports: [IconEdit, IconArrow, IconOpenBook, IconDelete],
  templateUrl: './item-list.html',
  styleUrl: './item-list.scss',
})
export class ItemList {

  @Input()
  items: Item[] = [];

  constructor(
    private itemService: ItemsService,
    private snackbar: SnackbarService
  ) {}

  deleteItem(id: string): void {
    this.itemService.delete(id).subscribe({
      next: () => {
        this.snackbar.show("Item deleted with success", 'success', 3000);
      },
      error: (err: any) => {
        //console.log(err);
        if (err.status === 400) {
          this.snackbar.show("Data is invalid", 'warning', 5000);
        } else {
          this.snackbar.show("Failed to communicate with the server", 'error', 5000);
        }
      }
    });
  }

  //=====================Pagination========================
  currentPage = 1;

  pageSize = 9;

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.items.length / this.pageSize));
  }

  get paginatedItems() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.items.slice(start, start + this.pageSize);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}
