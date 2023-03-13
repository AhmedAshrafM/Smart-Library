import { IsString, Min } from 'class-validator';

export class CreateGenreDto {
  @IsString()
  genreName: string;
}
