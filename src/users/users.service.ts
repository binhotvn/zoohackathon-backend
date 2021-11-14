import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserDocument } from './schemas/user.schema';

import vaildator from 'validator';
import { sha512 } from 'js-sha512';
@Injectable()
export class UsersService {
  constructor(    
    @InjectModel('User') private UserModule: Model<UserDocument>,
    private readonly jwtService: JwtService
  ){}
  async vaildLogin(eop: string, password:string): Promise<any>{
    const user = await this.findByEOP(eop);
    let message;
    if (user && user.password === sha512(password)) {
      const { password, ...result } = user;
      return {'data': result};

    } else {
      message = "PASSWORD_NOT_CORRECT";
    }

    return {'data': null, 'message': message };
  }
  async login(user: any){
    console.log(`user`, user)
    const payload_user = user._doc;
    const payload = { 
      phone: payload_user.phone,
      id: payload_user._id,
      email: payload_user.email,
      name: payload_user.name,
      token: payload_user.token
    };
    return {
      statusCode: 200,
      message: "LOGIN_SUCCESS",
      data:{

        access_token: this.jwtService.sign(payload)
      }
    };

  }
  async create(createUserInfor: CreateUserDto) {
    if(await this.findByEOP(createUserInfor.email) || await this.findByEOP(createUserInfor.phone)){
      throw new BadRequestException('USER_EXISTED');
    }
    const newData = {
      "token": "01"
      
    }
    Object.assign(createUserInfor, newData);
    createUserInfor.password = sha512(createUserInfor.password);

    const user = new this.UserModule(createUserInfor);
    const userResult = await user.save();
    return userResult;
  }

  findAll() {
    return this.UserModule.find().exec();
  }
  async searchByEop(eop){
    let neededUsers = null;
    if(vaildator.isEmail(eop)){
      neededUsers = await this.UserModule.find({email: eop}).exec()  
    } else {
      neededUsers = await this.UserModule.find({phone: eop}).exec();
    }
    return neededUsers;
  }
  async findByEOP(eop: string){
    let neededUsers = null;
    if(vaildator.isEmail(eop)){
      neededUsers = await this.UserModule.findOne({email: eop}).exec()  
    } else {
      neededUsers = await this.UserModule.findOne({phone: eop}).exec();
    }
    return neededUsers;
  }
  async findByID(id: string) {
    
    const user_find = await this.UserModule.findOne({_id: id}).exec();
    user_find.__v = undefined;
    user_find.password = undefined;
    return user_find;
  }

}
