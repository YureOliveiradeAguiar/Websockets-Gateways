import { Component, Input } from "@angular/core";

import { IconEdit } from "../../../assets/icons/edit.icon";
import { Item } from "../../models/item.model";

@Component({
  selector: 'app-item-list',
  imports: [IconEdit],
  templateUrl: './item-list.html',
  styleUrl: './item-list.scss',
})
export class ItemList {

  @Input()
  items!: Item[];

  //=====================Pagination========================
  currentPage = 1;

  pageSize = 9;

  get totalPages(): number {
    return Math.ceil(this.items.length / this.pageSize);
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
