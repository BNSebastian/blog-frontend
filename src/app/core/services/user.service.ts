import { CookieService } from "ngx-cookie-service";
import { catchError, Observable, throwError } from "rxjs";

import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

import { BACKEND } from "../../shared/environments/backend";

@Injectable({
    providedIn: "root",
})
export class UserService {
    private http = inject(HttpClient);
    private cookieService = inject(CookieService);

    getUserProfileImage(userEmail: string): Observable<ArrayBuffer> {
        return this.http
            .get(BACKEND.getUserProfileImage(userEmail), {
                responseType: "arraybuffer",
            })
            .pipe(
                catchError((error) => {
                    return throwError("An error occurred while fetching data.");
                })
            );
    }

    getById(id: number): Observable<ArrayBuffer> {
        return this.http
            .get(BACKEND.getProfileImageById(id), {
                responseType: "arraybuffer",
            })
            .pipe(
                catchError((error) => {
                    return throwError("an error occurred while fetching data.");
                })
            );
    }

    getProfileImageIds(): Observable<number[]> {
        return this.http.get<number[]>(BACKEND.getProfileImageCount()).pipe(
            catchError((error) => {
                return throwError("An error occurred while fetching data.");
            })
        );
    }

    setUserProfileImage(userId: number, imageId: number): Observable<any> {
        console.log(`user.service::setUserProfileImage -- trying to set user profile image for user ${userId} with image id ${imageId}`);
        return this.http.post<any>(BACKEND.setUserProfileImage(userId, imageId), null);
    }

    uploadUserProfileImage(requestBody: FormData): Observable<any> {
        return this.http.post<any>(BACKEND.uploadUserProfileImage(), requestBody);
    }

    getUserId(): string {
        return this.cookieService.get("id");
    }

    getUserEmail(): string {
        return this.cookieService.get("email");
    }

    getUserFirstname(): string {
        return this.cookieService.get("firstname");
    }

    getUserLastname(): string {
        return this.cookieService.get("lastname");
    }
}
