import { Module } from '@nestjs/common';
import { AiClientAppService } from './ai-client-app.service';
import { AiClientAppController } from './ai-client-app.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [AiClientAppService],
  controllers: [AiClientAppController]
})
export class AiClientAppModule {}
