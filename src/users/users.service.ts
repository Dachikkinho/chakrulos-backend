import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {

  constructor( private readonly usersRepository: UsersRepository,private readonly jwtService: JwtService){}
  create(createUserDto: CreateUserDto) {
    return this.usersRepository.create(createUserDto);
  }

  findAll() {
    return this.usersRepository.findAll();
  }

  findOne(id: number) {
    return this.usersRepository.findOne(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id,updateUserDto);
  }

  remove(id: number) {
    return this.usersRepository.remove(id);
  }
 
  
  async me(request){
    try{
      let cookie = request.cookies['jwt']

      let data = await this.jwtService.verifyAsync(cookie)      

      if(!data){
        throw new UnauthorizedException()
      }

      let user = this.usersRepository.findOne(data.id)
       return user
    } catch(err){
      throw new UnauthorizedException()
   }
  }
}
