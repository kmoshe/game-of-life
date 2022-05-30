import { TileStatus } from './tileStatus';

export interface GetLiveCountRequest {
  rowIndex: number;
  columnIndex: number;
  generation: TileStatus[][];
}
