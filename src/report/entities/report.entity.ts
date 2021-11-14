import { Prop, Schema} from "@nestjs/mongoose";
import { IsNotEmpty, IsOptional, IsPhoneNumber } from "class-validator";
import { v4 as uuidv4 } from 'uuid';

@Schema()
export class Report {
    @Prop({required: true, default: uuidv4})
    _id: string
    
    @Prop({required: true})
    @IsNotEmpty()
    link: string;

    @Prop({required: true, default: "nf"})
    @IsOptional()
    address: string;

    @Prop({required: true, default:  "nf"})
    @IsPhoneNumber('VN')
    @IsOptional()
    phone: string;

}
