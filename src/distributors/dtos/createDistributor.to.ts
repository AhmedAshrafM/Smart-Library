import { IsString } from "class-validator";

export class createDistributorDto {
    @IsString()
    distributorName: string;
}