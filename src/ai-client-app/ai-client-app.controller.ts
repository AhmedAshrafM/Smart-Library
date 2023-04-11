import { Controller, Post } from '@nestjs/common';
import { publicDecrypt } from 'crypto';
import { Public } from 'src/auth';
import { AiClientAppService } from './ai-client-app.service';

@Controller('ai-client-app')
export class AiClientAppController {
    constructor(private aiService: AiClientAppService){}
    @Public()
    @Post()
    async postToAi(){
        return await this.aiService.borrow()
    }
    
}
