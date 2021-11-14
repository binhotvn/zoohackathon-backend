import { BadRequestException, Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { MulterExtendedModule } from 'nestjs-multer-extended';
import { ProcessCredentials } from 'aws-sdk';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MulterExtendedModule.register({
      awsConfig: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_PRIVATE_KEY,
        region: process.env.AWS_REGION,
      },
      bucket: process.env.AWS_S3_BUCKET,
      basePath: 'image',
      fileSize: 1 * 1024 * 1024,
    })
  ],
  controllers: [FileController]
})
export class FileModule {}
