import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { environment } from '../../environments/environment';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const spinner = inject(NgxSpinnerService);
  const cloneReq = req.clone({ url: `${environment.api}/api${req.url}` });
  spinner.show();

  return next(cloneReq).pipe(
    finalize(() => {
      spinner.hide();
    }),
  );
};