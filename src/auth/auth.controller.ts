import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Response,Request } from 'express';
import { Public } from './decorators/public.decorator';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post('/login')
  Login(@Body() createAuthDto: CreateAuthDto, @Res({passthrough: true}) response: Response) {
    return this.authService.LoginUser(createAuthDto,response);
  }
}
