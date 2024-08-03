import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  public busyRequestCount: number = 0;

  constructor(private spinnerService: NgxSpinnerService) { }

  public busy(): void {
    this.busyRequestCount++;
    this.spinnerService;
    
    this.spinnerService.show(undefined,{
      type: 'pacman',
      bdColor: 'rgba(0,0,0,0.8)',
      color: '#ffd700',
      size: 'medium'
    });
  }

  public idle(): void {
    this.busyRequestCount--;

    if(this.busyRequestCount <= 0){
      this.busyRequestCount = 0;
      this.spinnerService.hide();
    }
  }
}
