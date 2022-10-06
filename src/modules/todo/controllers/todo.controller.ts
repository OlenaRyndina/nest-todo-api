import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';

import { Todo } from '../entities/todo.entity';
import { CreateDto, UpdateDto } from './dto';

@Controller('rest/todo')
export class TodoController {
    constructor() {}

    @Get()
    getAllAction(): string {
        return "get all";
    }

    @Get(':id')
    getOneAction(@Param('id') id: string): string {
        return "get One by id: " + id;
    }

    @Post()
    createAction(@Body() todo: CreateDto): CreateDto {
        console.log(todo);
        return todo;
    }

    @Put('id')
    updateAction(
        @Param('id') id: string, 
        @Body() todo: UpdateDto
    ): UpdateDto {
        console.log('search by ID: ', id);
        console.log(todo, 'saved');
        return todo;
    }

    @Delete(':id')
        deleteAction(@Param('id') id: string): string {
        return "delete id: " + id;
    }
}
