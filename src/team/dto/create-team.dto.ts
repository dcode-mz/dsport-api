import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsOptional, IsInt } from 'class-validator';

export class CreateTeamDto {
  @ApiProperty({ description: 'Nome da equipe', example: 'Time A' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'ID do gênero',
    example: 'g1h2i3j4-k5l6-m7n8-o9p0-q1r2s3t4u5v6',
  })
  @IsUUID()
  genderId: string;

  @ApiProperty({
    description: 'ID do tipo de equipe',
    example: 't1u2v3w4-x5y6-z7a8-b9c0-d1e2f3g4h5i6',
  })
  @IsUUID()
  teamTypeId: string;

  @ApiProperty({
    description: 'ID do local',
    example: 'v1w2x3y4-z5a6-b7c8-d9e0-f1g2h3i4j5k6',
  })
  @IsUUID()
  venueId: string;

  @ApiProperty({
    description: 'Contato da equipe',
    example: '1234-5678',
    required: false,
  })
  @IsOptional()
  @IsString()
  contact?: string;

  @ApiProperty({
    description: 'Localização da equipe',
    example: 'Cidade A',
    required: false,
  })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({
    description: 'ID do clube relacionado',
    example: 'c1d2e3f4-g5h6-i7j8-k9l0-m1n2o3p4q5r6',
  })
  @IsUUID()
  clubId: string;

  @ApiProperty({
    description: 'ID do esporte relacionado',
    example: 's1t2u3v4-w5x6-y7z8-a9b0-c1d2e3f4g5h6',
  })
  @IsUUID()
  sportId: string;

  @ApiProperty({
    description: 'ID da categoria etária',
    example: 'a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6',
  })
  @IsUUID()
  ageCategoryId: string;

  @ApiProperty({
    description: 'ID do formato da equipe',
    example: 'f1g2h3i4-j5k6-l7m8-n9o0-p1q2r3s4t5u6',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  formatId?: string;

  @ApiProperty({
    description: 'ID do capitão',
    example: 'p1q2r3s4-t5u6-v7w8-x9y0-z1a2b3c4d5e6',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  captainId?: string;

  @ApiProperty({
    description: 'ID do vice-capitão',
    example: 'p1q2r3s4-t5u6-v7w8-x9y0-z1a2b3c4d5f6',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  viceCaptainId?: string;

  @ApiProperty({
    description: 'ID do treinador',
    example: 't1u2v3w4-x5y6-z7a8-b9c0-d1e2f3g4h5i6',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  coachId?: string;
}
