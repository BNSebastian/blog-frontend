import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { NavbarComponent } from "./shared/components/navbar.component";

@Component({
    selector: "app-root",
    standalone: true,
    imports: [CommonModule, RouterOutlet, NavbarComponent],
    template: `<!-- START OF html -->
        <app-navbar></app-navbar>
        <!-- END OF html --> `,
})
export class AppComponent {
    title = "freevoice";
}
