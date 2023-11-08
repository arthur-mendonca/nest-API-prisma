/* eslint-disable prettier/prettier */
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  
  @IsNotEmpty()
  @IsString()
  name: string;
  
  @IsBoolean()
  admin: boolean;
}
