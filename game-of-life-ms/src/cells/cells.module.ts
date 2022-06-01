import { Module } from '@nestjs/common';
import { CellsController } from './controllers/cells.controller';
import { CellsService } from './services/cells.service';

@Module({
  controllers: [CellsController],
  providers: [CellsService],
})
export class CellsModule {}
