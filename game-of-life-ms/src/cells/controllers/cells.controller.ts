import { Body, Controller, Get, Post, Query, Logger } from '@nestjs/common';
import { FirstGenerationRequest } from '../../cells/entities/firstGenerationRequest';
import { FirstGenerationResponse } from '../entities/firstGenerationResponse';
import { GetLiveCountRequest } from '../entities/GetLiveCountRequest';
import { GetLiveCountResponse } from '../entities/GetLiveCountResponse';
import { NextGenerationRequest } from '../entities/nextGenerationRequest';
import { NextGenerationResponse } from '../entities/nextGenerationResponse';
import { CellsService } from '../services/cells.service';

@Controller('cells')
export class CellsController {
  private readonly logger = new Logger(CellsController.name);

  constructor(private cellsService: CellsService) {}

  @Get()
  getFirstGeneration(
    @Query() request: FirstGenerationRequest,
  ): FirstGenerationResponse {
    const generation = this.cellsService.computeFirstGeneration(
      request.rows,
      request.columns,
    );
    const response = {
      generation,
    };
    return response;
  }

  @Post('liveCount')
  getLiveCount(@Body() request: GetLiveCountRequest): GetLiveCountResponse {
    const count = this.cellsService.getLiveCount(
      request.rowIndex,
      request.columnIndex,
      request.generation,
    );
    return {
      count,
    };
  }

  @Post('nextGen')
  computeNextGeneration(
    @Body() request: NextGenerationRequest,
  ): NextGenerationResponse {
    const generation = this.cellsService.computeNextGeneration(
      request.generation,
    );
    const response: NextGenerationResponse = {
      generation,
    };
    return response;
  }
}
