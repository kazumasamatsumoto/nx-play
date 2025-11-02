import { Injectable } from '@nestjs/common';
import { MessageResponse } from '@my-fullstack-app/shared-type';

@Injectable()
export class AppService {
  getData(): MessageResponse {
    return { message: 'Hello from API ✅' };
  }
}
