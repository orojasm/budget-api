import { IsNumber, IsOptional, Min } from 'class-validator';

export class PaginationDto {
  /**
   * Máximo numero de registros enviados
   */
  @IsOptional()
  @IsNumber()
  @Min(1)
  readonly limit?: number;
  /**
   * Máximo numero de registros enviados
   */
  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly offset?: number;
}
