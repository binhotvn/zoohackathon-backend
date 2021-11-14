import { Prop, Schema } from '@nestjs/mongoose';
import { IsArray, IsEmail, IsEmpty, IsNotEmpty, IsOptional, IsPhoneNumber, IsUUID } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';
@Schema()
export class User {
    @Prop({required: true, default: uuidv4})
    @IsUUID('4')
    @IsOptional()
    _id: string;

    @Prop({required: true})
    @IsNotEmpty()
    name: string;

    @Prop({required: true})
    @IsEmail()
    email: string;

    @Prop({required: true})
    @IsPhoneNumber("VN")
    phone: string;


    @Prop({required: true})
    @IsNotEmpty()
    password: string;

    @Prop({required: true})
    @IsArray()
    @IsOptional()
    roles: String[]

    @Prop({required: true})
    @IsNotEmpty()
    company: string;

    @Prop({required: true, default: ""})
    @IsEmpty()
    token: string;
    
}
