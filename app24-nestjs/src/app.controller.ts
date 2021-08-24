import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';


// default landing page route

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  
}
