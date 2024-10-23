export class PlayerDto {
  id: string;
  name: string;
  nickname?: string;
  positionId: string;
  dateOfBirth: Date;
  nationality: string;
  height: number;
  weight: number;
  photoUrl?: string;
  teamId?: string;
  clubId?: string;
  createdAt: Date;
  updatedAt: Date;
}
