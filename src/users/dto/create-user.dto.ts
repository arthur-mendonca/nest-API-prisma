/* eslint-disable prettier/prettier */
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  
  @IsNotEmpty()
  @IsString()
  name: string;
  
  @IsBoolean()
  @IsOptional()
  admin: boolean;
}
