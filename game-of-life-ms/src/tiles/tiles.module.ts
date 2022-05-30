import { Module } from '@nestjs/common';
import { TilesController } from './controllers/tiles.controller';
import { TilesService } from './services/tiles.service';

@Module({
  controllers: [TilesController],
  providers: [TilesService]
})
export class TilesModule {}
