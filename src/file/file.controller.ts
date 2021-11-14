import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';

import { AmazonS3FileInterceptor } from 'nestjs-multer-extended';
@Controller('file')
export class FileController {
  constructor() {}

  @Post('upload')
  @UseInterceptors(
   
    AmazonS3FileInterceptor('image', {
      dynamicPath: 'public',
      randomFilename: true,
      limits: { fileSize: 15 * 1024 * 1024 },
      resizeMultiple: [
        { suffix: 'sm', height: 500},
        { suffix: 'md', height: 1000},
        { suffix: 'lg', height: 2000 },
        { suffix: 'thum', height: 1024, width: 1024}
      ],
    }),
    
  )
  uploadFile(@UploadedFile() image) {
    if(image !== undefined){
      let key = image.sm.key.split("-")
      key.pop();
      key = key.join("-");
      const files = {
        "sm": {
          "url": image.sm.Location,
          "path": image.sm.key
        },
        "md": {
          "url": image.md.Location,
          "path": image.md.key
        },
        "lg": {
          "url": image.lg.Location,
          "path": image.lg.key
        },
        "thum": {
          "url": image.thum.Location,
          "path": image.thum.key
        },
        "key": key
      };
      return files
    } else {
      throw new BadRequestException;
    }
  }


}
