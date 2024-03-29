import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { publicDecrypt } from 'crypto';
import { Public } from 'src/auth';
import { AiClientAppService } from './ai-client-app.service';
import { aiDto } from './dto';

@Controller('ai-client-app')
export class AiClientAppController {
    constructor(private aiService: AiClientAppService){}
    @Public()
    @Post('/id/:id')
    async postToAi(@Param('id', ParseIntPipe) id: number, @Body() dto: aiDto){        
        return await this.aiService.borrow(id,dto.algorithm)
    }
    @Public()
    @Post("/algorithm/:id")
    async updateConfig(
        @Param('id' ,ParseIntPipe) id:number
    ){
        return await this.aiService.updateAlgorithm(id)
    }
}
