import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InventoryService } from '../services/inventory.service';
import { Item } from '../models/item.model';

 @Component({
    selector: 'app-item-detail',
    templateUrl: './item-detail.component.html',
     styleUrls: ['./item-detail.component.css']
 })
 export class ItemDetailComponent implements OnInit {
    item: Item | null = null;

     constructor(
          private route: ActivatedRoute,
        private inventoryService: InventoryService
   ) { }

    ngOnInit(): void {
      this.route.params.subscribe(params => {
             const itemId = params['id'];
             this.loadItemDetails(itemId);
     });
  }

   loadItemDetails(itemId: string): void {
        this.inventoryService.getItem(itemId).subscribe(item => {
           this.item = item;
       });
   }
}