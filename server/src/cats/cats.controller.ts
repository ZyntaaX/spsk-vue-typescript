import { Controller, Get, Req, Param, Post, HttpCode, Body, HttpException, HttpStatus } from '@nestjs/common';
import { Request } from 'express';
import { CreateCatDto } from './create-cat.dto';

@Controller('cats')
export class CatsController {
    @Get()
    findAll(/*@Req() request: Request*/ /*@Param(cat_id?: string) params: Param */): string {
        console.log("Do we get a cat?");
        return 'This action returns all cats';
    }

    @Post()
    @HttpCode(204)
    async create(@Body() createCatDto: CreateCatDto) {
        console.log("Did we just create a cat?");
        return 'We just created a cat!';
    }

    @Get(':id')
    async findCatById(@Param() params: any): Promise<string> {
        if (params.id === '1') {
            throw new HttpException('Not authorized to get cat!', HttpStatus.FORBIDDEN)
        } else {
            return `We found cat with id ${params.id}`;
        }
    }
}