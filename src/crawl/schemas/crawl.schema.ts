import { SchemaFactory } from '@nestjs/mongoose';
import { Crawl } from '../entities/crawl.entity';

export type CrawlDocument = Crawl & Document;

export const CrawlSchema = SchemaFactory.createForClass(Crawl);
