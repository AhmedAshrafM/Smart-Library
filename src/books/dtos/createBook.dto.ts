import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, Min, ValidateNested } from 'class-validator';

export class createBookDto {
  @IsNotEmpty()
  bookTitle: string;
  @Min(1000)
  copyWriteYear: number;
  @IsString()
  subject: string;
  @Min(1)
  editionNumber: number;
  @Min(1)
  numberOfPages: number;
  @IsNotEmpty()
  authorIds: number[];
  @IsNotEmpty()
  publisherIds: number[];
  @IsNotEmpty()
  genreIds: number[];
}
