import { Body, Controller, Get, Post, Query, Logger } from '@nestjs/common';
import { FirstGenerationRequest } from '../entities/firstGenerationRequest';
import { FirstGenerationResponse } from '../entities/firstGenerationResponse';
import { GetLiveCountRequest } from '../entities/GetLiveCountRequest';
import { GetLiveCountResponse } from '../entities/GetLiveCountResponse';
import { NextGenerationRequest } from '../entities/nextGenerationRequest';
import { NextGenerationResponse } from '../entities/nextGenerationResponse';
import { TilesService } from '../services/tiles.service';

@Controller('tiles')
export class TilesController {
  private readonly logger = new Logger(TilesController.name);

  constructor(private tilesService: TilesService) {}

  @Get()
  getFirstGeneration(
    @Query() request: FirstGenerationRequest,
  ): FirstGenerationResponse {
    const generation = this.tilesService.computeFirstGeneration(
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
    const count = this.tilesService.getLiveCount(
      request.rowIndex,
      request.columnIndex,
      request.generation,
    );
    return {
      count,
    };
  }

  //   @Post()
  //   async computeNextGeneration(
  //     @Body() request: NextGenerationRequest,
  //   ): Promise<NextGenerationResponse> {
  //     request;
  //     const generation = this.tilesService.computeNextGeneration(
  //       request.generation,
  //     );
  //     const response: NextGenerationResponse = {
  //       generation,
  //     };
  //     return response;
  //   }
}
