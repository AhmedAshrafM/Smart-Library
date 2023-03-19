import { User } from "src/typeorm/entities/User";
import { createUserDto } from "../dtos/createUser.dto";

export const dtoToEntity = (creationDto: createUserDto): User => {
    let user: User = new User();
    user.fullName = creationDto.fullName
    user.email = creationDto.email
    user.password = creationDto.password
    user.flag = creationDto.flag
    user.phone = creationDto.phone
    user.createdAt = new Date();
    return user;
  };

