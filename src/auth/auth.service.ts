import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UsersRepository } from 'src/users/users.repository';
import * as Bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepo: UsersRepository, private readonly jwtService: JwtService) { }

  async Login(data: CreateAuthDto) {
    let user = await this.usersRepo.findUserByEmail(data.email)

    if (!user) {
      throw new UnauthorizedException('access denied')
    }

    const IsPasswordCorrect = await Bcrypt.compare(data.password, user.password)

    if (!IsPasswordCorrect) {
      throw new UnauthorizedException('access denied')
    }

    const jwtToken = await this.jwtService.signAsync({
      id: user.id,
      role: user.role
    })

    return jwtToken
  }
}