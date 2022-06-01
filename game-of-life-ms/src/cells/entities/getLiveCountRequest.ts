import { Generation } from './generation';

export interface GetLiveCountRequest {
  rowIndex: number;
  columnIndex: number;
  generation: Generation;
}
