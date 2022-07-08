import { Body, Controller, Delete, Get, Header, Headers, HttpCode, Param, Post, Query, Redirect, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateCatDto } from './dto/create-cat-dto';

@Controller('cats')
export class CatsController {
  @Get()
  @HttpCode(200)
  findAll(@Query() { express }: any) {
    return {
      message: 'Retorna todos os gatos [nestjs]',
      query: express
    }
  }

  @Get('express')
  findAllExpress(@Res() response: Response): Response {
    return response.status(200).json({ message: 'Retorna todos os gatos [express]' })
  }

  @Post()
  create(@Res() response: Response, @Body() createCatDto: CreateCatDto): Response {
    return response.status(200).json({ message: 'Criado um novo gato', cat: createCatDto })
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
