import { Prop, Schema } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import { IsArray, IsDateString, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsUUID, ValidateNested } from "class-validator";
import { v4 as uuidv4 } from 'uuid';
export class ScoreRequired {
    @IsNumber()
    score: number;

    @IsNumber()
    evaluate: number;

    @IsOptional()
    @IsArray()
    animal: string[]

    @IsOptional()
    phone: string;

    @IsOptional()
    address: string;

}
export class score {
    @IsNumber()
    score: number;

    @IsNumber()
    evaluate: number;

    @IsOptional()
    @IsArray()
    animal: string[]

    @IsOptional()
    phone: string;

    @IsOptional()
    address: string;

}
export class User {
    @IsNotEmpty()
    name: string;

    @IsOptional()
    id: string;
    @IsOptional()
    avatar: string;
    @IsOptional()
    link: string;
}

export class Media {

    @IsOptional()
    type: string;

    @IsOptional()
    media: string[];
}

export class Post {

    @IsOptional()
    caption: string;

    @IsOptional()
    comments: string[];

    @IsDateString()
    date: Date;
}
@Schema()
export class Crawl {

    @Prop({required: true, default: uuidv4})
    @IsEmpty()
    _id: string;
    @Prop({required: true})
    createdDate: Date;
    @Prop({required:true})
    @ValidateNested({ each: true })
    @Type(() => User)
    user: User;
    
    @Prop({required: true})
    @IsNotEmpty()
    source: string;
    
    @Prop({required: true})
    @ValidateNested({ each: true })
    @Type(() => Media)
    media: Media;
    
    @Prop({required: true})
    @ValidateNested({ each: true })
    @Type(() => Post)
    post: Post;

    @Prop({required: true})
    @ValidateNested({ each: true })
    @Type(() => score)
    score: score;
}
