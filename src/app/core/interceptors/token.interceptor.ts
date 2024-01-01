import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { CustomCookieService } from '../services/custom-cookie.service';

export const tokenInterceptor: HttpInterceptorFn = (request, next) => {
  const cookieService = inject(CustomCookieService);
  const authReq = request.clone({
    headers: request.headers.set('Authorization', cookieService.getToken()),
  });
  return next(authReq);
};
