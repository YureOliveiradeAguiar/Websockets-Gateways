import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-page-base',
  templateUrl: './page-base.html',
  styleUrl: './page-base.scss',
  imports: [RouterOutlet]
})
export class PageBase {}