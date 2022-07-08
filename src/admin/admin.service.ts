import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  randomNumber(min: number = 0, max: number = 0): number {
    return Math.round(Math.random() * (max - min) + min)
  }
}
