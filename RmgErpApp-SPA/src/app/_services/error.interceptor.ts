import { Injectable, ɵConsole } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(error => {
                if (error instanceof HttpErrorResponse) {
                    if (error.status === 401) {
                        return throwError(error.statusText);
                    }

                    const applicationError = error.headers.get('Application-Error');
                    if (applicationError) {
                        console.error(applicationError);
                        return throwError(applicationError);
                    }
                    const serverError = error.error;
                    let modalStateErrors = '';
                    if (serverError && typeof serverError === 'object') {
                        for (const key in serverError) {
                            // if (key === 'errors') {
                            //         console.log('Inside erros');
                            //         const i = serverError[key];
                            //         console.log('sdfsdfsdf == ' + i);
                            //         }
                            //         // modalStateErrors += errors[e] + '\n';
                            //     }
                            // }
                            if (serverError[key]) {
                                // console.log('key ====' + key);
                                // console.log('serverError === ' + serverError);
                                // console.log('serverError[key] === ' + serverError[key]);
                                modalStateErrors += serverError[key] + '\n';
                            }
                        }
                    }
                    console.log(modalStateErrors);
                    return throwError(modalStateErrors || serverError || 'ServerError');
                }
            })
        );
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};

