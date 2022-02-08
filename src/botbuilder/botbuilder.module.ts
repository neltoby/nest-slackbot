import { Module } from '@nestjs/common';
import { BotbuilderService } from './botbuilder.service';

@Module({
  providers: [BotbuilderService],
  exports: [BotbuilderService],
})
export class BotbuilderModule {}
