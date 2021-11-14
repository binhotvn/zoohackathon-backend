import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, ParseUUIDPipe } from '@nestjs/common';
import { CrawlService } from './crawl.service';
import { CreateCrawlDto } from './dto/create-crawl.dto';
import { UpdateCrawlDto } from './dto/update-crawl.dto';
import { score, ScoreRequired } from './entities/crawl.entity';

@Controller('post')
export class CrawlController {
  constructor(private readonly crawlService: CrawlService) {}

  @UsePipes(new ValidationPipe({ transform: true }))
  @Post()
  create(@Body() createCrawlDto: CreateCrawlDto) {
    return this.crawlService.create(createCrawlDto);
    
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Post(':id/processed')
  updateResult(@Param('id', new ParseUUIDPipe) id: string, @Body() result: score){
    console.log(`result`, result)
    return this.crawlService.processed(id, result);

  }
  @Get('popOut') 
  popOut(){
    return this.crawlService.popOut()
  }

  @Get()
  findAll() {
    return this.crawlService.findAll();
  }


  @Get('inv')
  inv(){
    return this.crawlService.inv();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.crawlService.findOne(id);
  }
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCrawlDto: UpdateCrawlDto) {
  //   return this.crawlService.update(+id, updateCrawlDto);
  // }

}
