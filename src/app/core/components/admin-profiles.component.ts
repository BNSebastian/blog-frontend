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
    selector: "app-admin-profiles",
    template: `
        <div class="container-primary bg-page-admin flex-row flex-center">
            <mat-card class="width-50">
                <mat-card-header class="margin-bottom-sm">
                    <mat-card-title>Upload profile images</mat-card-title>
                    <mat-card-subtitle>Once selected, the images are automatically uploaded</mat-card-subtitle>
                </mat-card-header>

                <mat-card-content>
                    <div>
                        <button mat-raised-button color="primary" (click)="fileInput.click()" class="width-100">Select profile image</button>
                        <input hidden #fileInput type="file" name="file" (change)="onUploadFile($any($event.target).files)" /></div
                ></mat-card-content>
            </mat-card>
        </div>
    `,
})
export class AdminProfileSComponent {
    public cookieService = inject(CustomCookieService);
    public registerForm!: FormGroup;
    public registerFormControls!: string[];
    public hidePassword = true;

    private formBuilder = inject(FormBuilder);
    private userService = inject(UserService);
    @Output()
    cancelRegister = new EventEmitter();

    public onUploadFile(files: FileList): void {
        const formData = new FormData();

        for (let i = 0; i < files.length; i++) {
            formData.append("file", files[i], files[i].name);
        }

        this.userService.uploadUserProfileImage(formData).subscribe(
            (event) => {
                return event;
            },
            (err) => console.error(err)
        );
    }
}
