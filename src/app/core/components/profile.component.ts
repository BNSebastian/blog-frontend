import { CommonModule } from "@angular/common";
import { Component, EventEmitter, inject, Output } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";

import { CustomCookieService } from "../services/custom-cookie.service";
import { UserService } from "../services/user.service";

@Component({
    standalone: true,
    imports: [CommonModule, MatInputModule, MatButtonModule, MatSelectModule, MatRadioModule, MatCardModule, MatIconModule, ReactiveFormsModule],
    selector: "app-profile",
    template: `
        <form [formGroup]="registerForm">
            <mat-card>
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

                    <div>
                        <p>Currently disabled so people won't be able to upload strange stuff</p>
                        <button mat-raised-button color="primary" (click)="fileInput.click()" class="width-100" disabled="true">Select profile image</button>
                        <input hidden #fileInput type="file" name="file" (change)="updateProfileImage($any($event.target).files)" />
                    </div>
                </mat-card-content>
            </mat-card>
        </form>
    `,
})
export class ProfileComponent {
    public cookieService = inject(CustomCookieService);
    public registerForm!: FormGroup;
    public registerFormControls!: string[];
    public hidePassword = true;

    private formBuilder = inject(FormBuilder);
    private userService = inject(UserService);
    @Output()
    cancelRegister = new EventEmitter();

    ngOnInit() {
        this.createForm();
        this.registerFormControls = this.loopThroughFormControls();
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

    public updateProfileImage(files: FileList): void {
        const userId: number = Number(this.userService.getUserId());
        const formData = new FormData();

        // Loop through the FileList and append each file to the FormData
        for (let i = 0; i < files.length; i++) {
            formData.append("file", files[i], files[i].name);
        }

        this.userService.setUserProfileImage(userId, formData).subscribe(
            (event) => {
                return event;
            },
            (err) => console.error(err)
        );
    }

    public getAllProfileImages() {}
}
