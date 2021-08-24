/// <reference types="mongoose" />
import { CreateItemDto } from './dto/create-item.dto';
import { ItemsService } from './items.service';
import { Item } from './interfaces/items.interface';
export declare class ItemsController {
    private readonly itemsService;
    constructor(itemsService: ItemsService);
    findAll(): Promise<Item[]>;
    findOne(id: any): Promise<Item & import("mongoose").Document<any, any, Item>>;
    create(createItemDto: CreateItemDto): Promise<Item>;
    delete(id: any): string;
}
