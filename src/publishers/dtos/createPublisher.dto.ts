import { IsString } from "class-validator";

export class createPublisherDto {
    @IsString()
    publisherName: string;
}