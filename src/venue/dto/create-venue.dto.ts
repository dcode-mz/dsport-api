import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateVenueDto {
  @ApiProperty({
    description: 'Nome do local (venue)',
    example: 'Estádio da Machava',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Localização do venue',
    example: 'Maputo, Moçambique',
  })
  @IsString()
  location: string;

  @ApiPropertyOptional({ description: 'Capacidade do venue', example: 50000 })
  @IsOptional()
  @IsInt()
  capacity?: number;
}
