// item.models.ts

export interface Item {
    _id?: string;
    name: string;
    upc: string;
    quantity: number;
    description?: string;
}
