import { IsNotEmpty, isString } from "class-validator";

export class aiDto{
    @IsNotEmpty()
    algorithm: string;

}