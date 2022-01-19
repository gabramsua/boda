import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
    selector: 'modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
  })
export class ModalComponent {
    // constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) { }
}
  