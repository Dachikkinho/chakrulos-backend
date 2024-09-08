import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as Bcrypt from "bcrypt"
import { UsersRepository } from 'src/users/users.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly jwtService: JwtService
  ){}

  async LoginUser(createAuthDto: CreateAuthDto, response) {
    
    let user = await this.userRepository.findUserByEmail(createAuthDto.email)

    if(user){
      if(await Bcrypt.compare(createAuthDto.password,user.password)){
        let jwt = await this.jwtService.signAsync({id: user.id})   
        response.cookie('jwt',jwt, {httpOnly: true})       
          return {
            token: jwt
          }
      }
    }
    throw new BadRequestException('bed request')
   }
}