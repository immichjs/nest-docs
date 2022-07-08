import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { AdminService } from './admin.service';

interface IPerson {
  name: string;
  age: number;
}

interface IResponse extends IPerson {
  dev?: true
}

@Controller('admin')
export class AdminController {
  constructor (private readonly adminService: AdminService) {}
  @Get()
  index(): string {
    return 'Admin page'
  }

  @Get('random')
  async random(@Res() response: Response) {
    return response.status(200).json({ number: await this.adminService.randomNumber(0, 50) })
  }

  @Get('person')
  async personData(): Promise<IPerson | IResponse> {
    const TIME = 2000

    const person = await new Promise<IPerson>((resolve, reject) => {
      const personData = { name: 'Mich', age: 20 }
      setTimeout(() => resolve(personData), TIME)
    }).then(person => person)

    return { dev: true, ...person }
  }
}
