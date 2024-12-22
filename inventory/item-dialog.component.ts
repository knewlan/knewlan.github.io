// item-dialog.component.ts

 import { Component, Inject } from '@angular/core';
 import { FormGroup, FormControl } from '@angular/forms';
 import { InventoryService } from '../services/inventory.service';
 import { Item } from '../models/item.model';
 import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

 @Component({
    selector: 'app-item-dialog',
    templateUrl: './item-dialog.component.html',
    styleUrls: ['./item-dialog.component.css']
  })
  export class ItemDialogComponent {
    itemForm: FormGroup;

    constructor(private inventoryService: InventoryService,
        public dialogRef: MatDialogRef<ItemDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            this.itemForm = new FormGroup({
                name: new FormControl(''),
                description: new FormControl(''),
                quantity: new FormControl(0)
            })
        }

    ngOnInit(): void {
        if (this.data) {
            this.itemForm.patchValue(this.data)
        }
    }
    onSubmit(): void {
        if (this.itemForm.valid) {
            if (this.data && this.data._id) {
                this.inventoryService.updateItem(this.data._id, this.itemForm.value).subscribe(result => {
                    this.dialogRef.close(result);
                });
            } else {
                this.inventoryService.addItem(this.itemForm.value).subscribe(result => {
                    this.dialogRef.close(result);
                },
                (error) => {
                    console.error('Error adding item: ', error)
                });
            }
        }
    }
}