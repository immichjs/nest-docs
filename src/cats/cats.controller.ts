import { Body, Controller, Delete, Get, Header, Headers, HttpCode, Param, Post, Query, Redirect, Res } from '@nestjs/common';
import { Response } from 'express';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat-dto';
import { Cat } from './interface/cat.interface';

@Controller('cats')
export class CatsController {
  constructor (private readonly catsService: CatsService) {}

  @Get()
  @HttpCode(200)
  async findAll(): Promise<Cat[]> {
    return await this.catsService.findAll()
  }

  @Get('express')
  findAllExpress(@Res() response: Response): Response {
    return response.status(200).json({ message: 'Retorna todos os gatos [express]' })
  }

  @Post()
  create(@Res() response: Response, @Body() createCatDto: CreateCatDto): Response {
    this.catsService.create(createCatDto)
    return response.status(201).json({ message: 'Criado um novo gato', cat: createCatDto })
  }

  @Get('ab*cd')
  findAllAbcd(@Res() response: Response) {
    return response.status(200).json({ message: 'É capaz de ler todos os caracteres contidos dentro de [*] da URL' })
  }
  
  @Get('headers')
  @Header('Authorization', 'Header setado pelo NestJS')
  findAllHeaders(@Headers('Authorization') auth: string) {
    return { auth }
  }
  

  @Get('redirect')
  @Redirect('https://nestjs.com', 302)
  redirect(@Query('version') version: string) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' }
    }
  }
  
  @Delete(':id')
  @HttpCode(200)
  remove(@Param('id') id: string) {
    return { message: 'Removido um gato', id }
  }
}
