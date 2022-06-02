import { Generation } from './generation';

export interface NextGenerationRequest {
  rows: number;
  columns: number;
  generation?: Generation;
}
