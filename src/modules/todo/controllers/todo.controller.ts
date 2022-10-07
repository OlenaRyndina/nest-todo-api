import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiTags, ApiResponse } from '@nestjs/swagger';

import { Todo } from '../entities/todo.entity';
import { CreateDto, UpdateDto } from './dto';
import { TodoService } from '../services/todo.service';

@ApiTags('todo')
@Controller('rest/todo')
export class TodoController {
    constructor(
        private readonly todoService: TodoService
    ) {}

    @Get()
    @ApiResponse({
        status: 200,
        description: 'get all todo',
        type: [Todo]
    })
    @ApiResponse({
        status: 404,
        description: 'Not Found',
        type: Todo
    })
    getAllAction(): Promise<Todo[]> {
        return this.todoService.findAll();
    }

    @Get(':id')
    @ApiResponse({
        status: 200,
        description: 'get todo by id',
        type: Todo
    })
    @ApiResponse({
        status: 404,
        description: 'Not Found',
        type: Todo
    })
    async getOneAction(@Param('id') id: string): Promise<Todo> {
        const todo = await this.todoService.findOne(id);
        if (!todo) {
            throw new NotFoundException('Todo # ' + id + ' does not exist');
        }
        return todo;
    }

    @Post()
    @ApiResponse({
        status: 200,
        description: 'create todo',
        type: Todo
    })
    @ApiResponse({
        status: 404,
        description: 'Not Found',
        type: Todo
    })
    @ApiBody({type: CreateDto})
    createAction(@Body() createDto: CreateDto): Promise<Todo> {
        const todo = new Todo();
        todo.title = createDto.title;

        if (createDto.isCompleted !== undefined) {
            todo.isCompleted = createDto.isCompleted;
        }
        return this.todoService.create(todo);
    }

    @Put(':id')
    @ApiResponse({
        status: 200,
        description: 'update todo',
        type: Todo
    })
    @ApiResponse({
        status: 404,
        description: 'Not Found',
        type: Todo
    })
    @ApiBody({type: UpdateDto})
    async updateAction(
        @Param('id') id: string, 
        @Body() {title, isCompleted = false}: UpdateDto
    ): Promise<Todo> {
        const todo = await this.todoService.findOne(id);
        if (!todo) {
            throw new NotFoundException('Todo # ' + id + ' does not exist');
        }
        todo.title = title;
        todo.isCompleted = isCompleted;
        return this.todoService.update(todo);
    }

    @Delete(':id')
    @ApiResponse({
        status: 200,
        description: 'delete todo',
        type: Todo
    })
    @ApiResponse({
        status: 404,
        description: 'Not Found',
        type: Todo
    })
        deleteAction(@Param('id') id: string): Promise<void> {
        return this.todoService.remove(id);
    }
}
