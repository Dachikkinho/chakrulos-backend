import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Response,Request } from 'express';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  Login(@Body() createAuthDto: CreateAuthDto, @Res({passthrough: true}) response: Response) {
    return this.authService.LoginUser(createAuthDto,response);
  }
}
