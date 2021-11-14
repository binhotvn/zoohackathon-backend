import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCrawlDto } from './dto/create-crawl.dto';
import { UpdateCrawlDto } from './dto/update-crawl.dto';
import { CrawlDocument } from './schemas/crawl.schema';

@Injectable()
export class CrawlService {
  constructor(

    @InjectModel('Crawl') private CrawlModule: Model<CrawlDocument>,
    private readonly jwtService: JwtService
  ){}
  async create(createCrawlDto: CreateCrawlDto) {
    const newData = {
      "score": {
        score: -1
      },

    }
    Object.assign(createCrawlDto, newData);
    const post = new this.CrawlModule(createCrawlDto);
    const post_save = await post.save();
    return post_save;
  }

  async popOut(){
    const pop = this.CrawlModule.findOne({"score.score": -1}).sort({"post.date": "ASC"}).exec() ;

    return pop;
  }
  async processed(id: string, result: any){
    let pop = await this.CrawlModule.findOne({_id: id}).exec();
    if(pop == null){
      throw new NotFoundException("CAN_NOT_FOUND")
    }
    const resultData = await this.CrawlModule.findOneAndUpdate({_id: id}, {score: result}).exec();

    if(resultData === null){
      throw new BadRequestException("NOT_THING_UPDATED");
    } else {
      return {statusCode: 200, message: "UPDATED"}
    }
  }
  findAll() {
    return this.CrawlModule.find();
  }
  async inv(){
    const list = await this.CrawlModule.find({"score.evaluate": {$gte: 0.5}}).exec();
    console.log(`list`, list)
    return list;
  }
  findOne(id: string) {
    return this.CrawlModule.findOne({_id: id});
  }

}
