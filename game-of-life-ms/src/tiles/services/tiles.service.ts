import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TileStatus } from '../entities/tileStatus';

@Injectable()
export class TilesService {

  getLiveCount(
    rowIndex: number,
    columnIndex: number,
    generation: TileStatus[][],
  ): number {
    const tilePositions = [
      [rowIndex - 1, columnIndex - 1],
      [rowIndex - 1, columnIndex],
      [rowIndex - 1, columnIndex + 1],
      [rowIndex, columnIndex - 1],
      [rowIndex, columnIndex + 1],
      [rowIndex + 1, columnIndex - 1],
      [rowIndex + 1, columnIndex],
      [rowIndex + 1, columnIndex + 1],
    ];
    const totalCount = tilePositions
      .map((position) => {
        let liveCount = 0;
        const row = generation[position[0]];
        if (row) {
          liveCount = row[position[1]] || 0;
        }
        return liveCount;
      })
      .reduce((accumulator, current) => accumulator + current, 0);
    return totalCount;
  }

  computeNextGeneration(generation: TileStatus[][]): TileStatus[][] {
    const nextGeneration: TileStatus[][] = [];
    for (let rowIndex = 0; rowIndex < generation.length; rowIndex++) {
      const row = nextGeneration[rowIndex];
      for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
        const tile = row[columnIndex];
        if (tile === TileStatus.ALIVE) {
        }
      }
    }
    return nextGeneration;
  }

  computeFirstGeneration(rows: number, columns: number): TileStatus[][] {
    const RANDOM_LIMIT = 0.7;
    if (rows < 5 || columns < 5) {
      throw new HttpException(
        'Rows and columns has to be bigger than 5',
        HttpStatus.BAD_REQUEST,
      );
    }
    const generation = Array.from({ length: rows }, () =>
      Array.from({ length: columns }, () =>
        Math.random() > RANDOM_LIMIT ? TileStatus.ALIVE : TileStatus.DEAD,
      ),
    );
    return generation;
  }
}
