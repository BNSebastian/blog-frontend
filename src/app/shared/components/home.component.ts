import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { Router } from "@angular/router";

import { AuthService } from "../../core/services/auth.service";
import { FRONTEND } from "../environments/frontend";

@Component({
    selector: "app-home",
    standalone: true,
    imports: [MatGridListModule, MatButtonModule, MatExpansionModule, MatIconModule],
    template: `
        <div class="container-primary flex-row-dynamic flex-center bg-page-home ">
            <div class="width-70">
                <h1 class="text-funky text-center">Freevoice</h1>
            </div>
            <div class="margin-md width-30">
                <mat-accordion>
                    <mat-expansion-panel hideToggle>
                        <mat-expansion-panel-header>
                            <mat-panel-title> About us </mat-panel-title>
                            <mat-panel-description class="flex-row flex-end">
                                <mat-icon>info</mat-icon>
                            </mat-panel-description>
                        </mat-expansion-panel-header>
                        <p>We're a tight knit community looking for some answers.</p>
                    </mat-expansion-panel>
                    <mat-expansion-panel (opened)="panelOpenState = true" (closed)="panelOpenState = false">
                        <mat-expansion-panel-header>
                            <mat-panel-title> Code of conduct </mat-panel-title>
                            <mat-panel-description class="flex-row flex-end">
                                <mat-icon>gavel</mat-icon>
                            </mat-panel-description>
                        </mat-expansion-panel-header>
                        <p>Behave like a decent human being</p>
                    </mat-expansion-panel>
                </mat-accordion>

                @if (!userService.isAuthenticated()) {
                <button mat-raised-button color="primary" (click)="signUp()" class="width-100 margin-top-sm">Sign up</button>
                <button mat-raised-button color="primary" (click)="logIn()" class="width-100 margin-top-sm">Log in</button>
                } @if (userService.isAuthenticated()) {
                <button mat-raised-button color="primary" (click)="donate()" class="width-100 margin-top-sm">Tip jar</button>
                }
            </div>
        </div>
    `,
})
export class HomeComponent {
    public panelOpenState = false;
    public userService = inject(AuthService);
    private router = inject(Router);
    donate() {
        this.router.navigate([FRONTEND.getDonatePage()]);
    }

    signUp() {
        this.router.navigate([FRONTEND.signUp()]);
    }

    logIn() {
        this.router.navigate([FRONTEND.logIn()]);
    }
}
