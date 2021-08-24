import { Injectable } from '@nestjs/common';
import { Item } from './interfaces/items.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ItemsService {

   constructor(@InjectModel('Item') private readonly itemModel:Model<Item>){}

   async findAll():Promise<Item[]>{
    return await this.itemModel.find();
   }

   findOne(id){
    return this.itemModel.findById(id);
   }

   async createItem(item:Item){
      const newItem = new this.itemModel(item);
      return await newItem.save();
   }

}
