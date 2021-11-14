import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';


import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CrawlModule } from './crawl/crawl.module';
import { ReportModule } from './report/report.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.register(),
    MongooseModule.forRoot('mongodb://wildgogh:WildGogh2021@18.141.164.72:27017/wildgogh?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false'),
    UsersModule,
    CrawlModule,
    ReportModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
