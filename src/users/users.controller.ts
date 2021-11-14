import { Controller, Get, Post, Body, Patch, Param, Request, Delete, UsePipes, ValidationPipe, ParseUUIDPipe, NotFoundException, UseGuards, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { LocalAuthGuard } from "src/auth/guards/local-auth.guard";
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UsePipes(new ValidationPipe({ transform: true }))
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const createUser = await this.usersService.create(createUserDto);
    if(createUser !== null){
      return {
        statusCode: 201,
        message: "CREATED"
      }
    } else {
      throw new BadRequestException("CAN_NOT_CREATE_USER")
    }
  }


  @Get('find')
  async findBy(@Body("keyword") keyword: string){
    const user = await this.usersService.searchByEop(keyword);
    return user;
  }
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req){
    console.log(`req`, req)
    return this.usersService.login(req.user)
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  async getProfile(@Request() req){
    const user = await this.usersService.findByID(req.user.id);
    return user;
  }

  // @UseGuards(JwtAuthGuard)
  // @Get(":id")
  // async getId(@Param("id", new ParseUUIDPipe) id: string){
  //   const user = await this.usersService.findByID(id);
  //   if(user == null){
  //     throw new NotFoundException("USER_NOT_FOUND");
  //   } else {
  //     return user;
  //   }
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

}
