import { Component, ViewChild } from '@angular/core';
import { InventoryService } from '../services/inventory.service';
import { Item } from '../models/item.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ItemDialogComponent } from './item-dialog.component';

@Component({
selector: 'app-inventory-list',
templateUrl: './inventory-list.component.html',
styleUrls: ['./inventory-list.component.css']
})
export class InventoryListComponent {
 items: Item[] = [];
 displayedColumns: string[] = ['name', 'upc', 'quantity', 'actions'];
 dataSource: MatTableDataSource<Item> = new MatTableDataSource<Item>();
 searchTerm: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
 @ViewChild(MatSort) sort!: MatSort;
 constructor(private inventoryService: InventoryService,
      private router: Router,
       public dialog: MatDialog) {
  }

 ngOnInit(): void {
     this.loadInventory();
 }

 loadInventory(): void {
     this.inventoryService.getItems().subscribe((items) => {
           this.dataSource = new MatTableDataSource<Item>(items);
         this.dataSource.paginator = this.paginator;
         this.dataSource.sort = this.sort;
     });
 }
 searchItems(): void {
    if (this.searchTerm) {
         this.inventoryService.searchItems(this.searchTerm).subscribe((items) => {
             this.dataSource = new MatTableDataSource<Item>(items);
           this.dataSource.paginator = this.paginator;
             this.dataSource.sort = this.sort;
         });
    } else {
         this.loadInventory();
   }
 }
  viewItemDetails(id: string): void {
    this.router.navigate(['/inventory', id]);
 }
 addItem(): void {
   this.openItemDialog(null);
}

editItem(item: Item): void {
  this.openItemDialog(item);
 }

deleteItem(item: Item): void {
 this.inventoryService.deleteItem(item._id!).subscribe(() => {
     this.loadInventory();
  });
 }
  openItemDialog(item: Item | null): void {
       const dialogRef = this.dialog.open(ItemDialogComponent, {
          width: '400px',
         data: item ? { ...item } : null
       });

         dialogRef.afterClosed().subscribe(result => {
             if (result) {
                 this.loadInventory();
          }
        });
}
}