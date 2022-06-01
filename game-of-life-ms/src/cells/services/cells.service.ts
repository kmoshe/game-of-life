import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Generation } from '../entities/generation';
import { CellStatus } from '../entities/cellStatus';

@Injectable()
export class CellsService {
  getLiveCount(
    rowIndex: number,
    columnIndex: number,
    generation: Generation,
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
      .map(position => {
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

  computeNextGeneration(generation: Generation): Generation {
    const nextGeneration: Generation = generation.map(
      (generationRow, rowIndex) =>
        generationRow.map((cellStatus, columnIndex) => {
          const liveCount = this.getLiveCount(
            rowIndex,
            columnIndex,
            generation,
          );
          let nextGenerationTile;
          if (
            cellStatus === CellStatus.ALIVE &&
            (liveCount === 2 || liveCount === 3)
          ) {
            nextGenerationTile = CellStatus.ALIVE;
          } else if (cellStatus === CellStatus.DEAD && liveCount === 3) {
            nextGenerationTile = CellStatus.ALIVE;
          }
          return nextGenerationTile || CellStatus.DEAD;
        }),
    );
    return nextGeneration;
  }

  computeFirstGeneration(rows: number, columns: number): Generation {
    const RANDOM_LIMIT = 0.9;
    if (rows < 5 || columns < 5) {
      throw new HttpException(
        'Rows and columns has to be bigger than 5',
        HttpStatus.BAD_REQUEST,
      );
    }
    const generation = Array.from({ length: rows }, () =>
      Array.from({ length: columns }, () =>
        Math.random() > RANDOM_LIMIT ? CellStatus.ALIVE : CellStatus.DEAD,
      ),
    );
    return generation;
  }
}
