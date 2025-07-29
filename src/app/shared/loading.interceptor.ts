import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  let spinnerService = inject(NgxSpinnerService); 
  spinnerService.show();
  return next(req).pipe(
    finalize(() => {
      
        spinnerService.hide();
      
    })
  );};
