import { Observable } from "rxjs";

import { CommonModule } from "@angular/common";
import { Component, EventEmitter, inject, Output } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { DomSanitizer } from "@angular/platform-browser";

import { IProfileImage } from "../models/user";
import { CustomCookieService } from "../services/custom-cookie.service";
import { UserService } from "../services/user.service";

@Component({
    standalone: true,
    imports: [
        CommonModule,
        MatExpansionModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatRadioModule,
        MatCardModule,
        MatIconModule,
        ReactiveFormsModule,
    ],
    selector: "app-profile",
    template: `
        <form [formGroup]="registerForm">
            <mat-card>
                <div class="hover margin-bottom-sm">
                    <img [src]="currentProfileImage" class="profile-image-lg margin-left-sm margin-top-sm" />
                </div>
                <mat-card-content>
                    <mat-form-field class="width-100" floatLabel="always">
                        <mat-label>e-mail</mat-label>
                        <input matInput formControlName="email" />
                    </mat-form-field>

                    <mat-form-field class="width-100" floatLabel="always">
                        <mat-label>firstname</mat-label>
                        <input matInput formControlName="firstname" />
                    </mat-form-field>

                    <mat-form-field class="width-100" floatLabel="always">
                        <mat-label>lastname</mat-label>
                        <input matInput formControlName="lastname" />
                    </mat-form-field>

                    <!-- list of images  -->
                    <mat-accordion>
                        <mat-expansion-panel (opened)="panelOpenState = true" (closed)="panelOpenState = false">
                            <mat-expansion-panel-header>
                                <mat-panel-title> Choose your profile image </mat-panel-title>
                            </mat-expansion-panel-header>
                            <div class="flex-row flex-wrap">
                                @for (item of images; track $index) {
                                <div class="hover" (click)="updateProfileImage(item.id)">
                                    <img [src]="item.link" class="profile-image margin-left-sm margin-top-sm" />
                                </div>
                                }
                            </div>
                        </mat-expansion-panel>
                    </mat-accordion>
                </mat-card-content>
            </mat-card>
        </form>
    `,
})
export class ProfileComponent {
    cookieService = inject(CustomCookieService);
    registerForm!: FormGroup;
    registerFormControls!: string[];
    hidePassword = true;
    profileImagePks: number[] = [];
    images: IProfileImage[] = [];
    currentProfileImage!: any;
    profileImages: any[] = [];
    currentUserId!: number;
    panelOpenState = false;
    formBuilder = inject(FormBuilder);
    userService = inject(UserService);
    sanitizer = inject(DomSanitizer);

    @Output() cancelRegister = new EventEmitter();

    ngOnInit() {
        const userEmail = this.userService.getUserEmail();

        this.createForm();
        this.getProfileImageByUserEmail(userEmail);
        this.registerFormControls = this.loopThroughFormControls();
        this.getPrimaryKeys();
        this.currentUserId = Number(this.cookieService.getUserId());
    }

    getPrimaryKeys() {
        this.userService.getProfileImageIds().subscribe((response) => {
            response.forEach((primaryKey) => {
                this.getProfileImageById(primaryKey).subscribe((link) => {
                    const newImage: IProfileImage = {
                        id: primaryKey,
                        link: link,
                    };
                    this.images.push(newImage);
                });
            });
        });
    }

    createForm() {
        this.registerForm = this.formBuilder.group({
            email: new FormControl({
                value: this.cookieService.getUserEmail(),
                disabled: true,
            }),
            firstname: new FormControl({
                value: this.cookieService.getUserFirstname(),
                disabled: true,
            }),
            lastname: new FormControl({
                value: this.cookieService.getUserLastname(),
                disabled: true,
            }),
        });
    }

    loopThroughFormControls() {
        if (this.registerForm) {
            const controlKeys = Object.keys(this.registerForm.controls);
            return controlKeys;
        }
        return [];
    }

    updateProfileImage(imageId: number): void {
        this.userService.setUserProfileImage(this.currentUserId, imageId).subscribe(() => {
            this.currentProfileImage = this.getProfileImageByUserEmail(this.userService.getUserEmail());
        });
    }

    getProfileImageById(id: number): Observable<any> {
        return new Observable((observer) => {
            this.userService.getProfileImageById(id).subscribe(
                (response: ArrayBuffer) => {
                    const blob = new Blob([response], { type: "image/png" });
                    const imageUrl = URL.createObjectURL(blob);
                    observer.next(this.sanitizer.bypassSecurityTrustUrl(imageUrl));
                    observer.complete();
                },
                (error) => {
                    console.error("Error fetching user profile image:", error);
                    observer.error(error);
                }
            );
        });
    }

    getProfileImageByUserEmail(email: string): any {
        this.userService.getProfileImageByUserEmail(email).subscribe(
            (response: ArrayBuffer) => {
                const blob = new Blob([response], { type: "image/png" });
                const imageUrl = URL.createObjectURL(blob);
                this.currentProfileImage = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
            },
            (error) => {
                console.error("Error fetching user profile image:", error);
            }
        );
    }
}
