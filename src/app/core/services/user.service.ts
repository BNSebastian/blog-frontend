import { CookieService } from "ngx-cookie-service";
import { catchError, map, Observable, throwError } from "rxjs";

import { HttpClient, HttpEvent } from "@angular/common/http";
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
                    // Do something else here instead of logging to the console
                    // For example, you can notify the user or perform another action

                    // Return an observable with a default value or empty result
                    return throwError("An error occurred while fetching data.");
                })
            );
    }

    setUserProfileImage(userId: number, requestBody: FormData): Observable<any> {
        return this.http.post<any>(BACKEND.setUserProfileImage(userId), requestBody);
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
