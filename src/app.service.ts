import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getIndex(): string {
    return 'Ping pong';
  }
}
