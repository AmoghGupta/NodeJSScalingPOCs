import { Item } from './interfaces/items.interface';
import { Model } from 'mongoose';
export declare class ItemsService {
    private readonly itemModel;
    constructor(itemModel: Model<Item>);
    findAll(): Promise<Item[]>;
    findOne(id: any): import("mongoose").Query<Item & import("mongoose").Document<any, any, Item>, Item & import("mongoose").Document<any, any, Item>, {}, Item>;
    createItem(item: Item): Promise<Item & import("mongoose").Document<any, any, Item>>;
}
