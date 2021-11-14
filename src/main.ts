import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('/etc/letsencrypt/live/api.wildgogh.altwis.com/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/api.wildgogh.altwis.com/fullchain.pem'),
  };
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });

  await app.listen(443);
}
bootstrap();