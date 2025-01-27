import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsUUID, IsDate, IsOptional } from 'class-validator';

export class CreateRefereeDto {
  @ApiProperty({ description: 'Nome do árbitro', example: 'Pierluigi Collina' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Data de nascimento do árbitro',
    example: '1960-02-13',
    required: false,
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dateOfBirth?: Date;

  @ApiProperty({
    description: 'ID da nacionalidade do árbitro',
    example: 'c1d2e3f4-g5h6-i7j8-k9l0-m1n2o3p4q5r6',
  })
  @IsUUID()
  nationalityId: string;

  @ApiProperty({
    description: 'URL da foto do árbitro',
    example: 'https://example.com/photo.jpg',
    required: false,
  })
  @IsOptional()
  @IsString()
  photoUrl?: string;
}
