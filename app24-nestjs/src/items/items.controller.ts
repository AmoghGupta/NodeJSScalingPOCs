import { Controller,Get, Post, Put, Delete, Body, Req, Res, Param, ParseIntPipe, UseFilters, HttpException, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import {CreateItemDto} from './dto/create-item.dto';
import {Request, Response} from 'express';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemsService } from './items.service';
import { timeStamp } from 'console';
import { Item } from './interfaces/items.interface';
import { BaseExceptionFilter } from '@nestjs/core';
import { NoDataException } from 'src/common/exceptions/norecord.exception';
import { JoiValidationPipe } from 'src/common/pipes/validation.pipe';
import { ItemSchema } from './schemas/item.schema';

// items route
@Controller('items')
export class ItemsController {

    constructor(private readonly itemsService: ItemsService) {

    }

    // a get call for items controller
    @Get()
    findAll(): Promise<Item[]> {
        return this.itemsService.findAll();
    }


    @Get(':id')
    async findOne(@Param('id') id) {
         const data = await this.itemsService.findOne(id);         
         if(!data){
            // custom exception
            throw new NoDataException();
         }
         return data;
    }

    @Post()
    @UsePipes(new JoiValidationPipe(ItemSchema))
    create(
        @Body() createItemDto:CreateItemDto
        ): Promise<Item>{
        return this.itemsService.createItem({
            name:createItemDto.name,
            description:createItemDto.description,
            qty:createItemDto.qty
        });
    }

    @Delete(':id')
    delete(@Param('id') id): string{
        return `Delete ${id}`
    }

    // @Put(':id')
    // update(@Body() updateItemDto:UpdateItemDto,@Param('id') id): string{
    //     return `Update id ${id} - Name ${updateItemDto.name}`
    // }

}
