/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    description: "User e-mail",
  })
  @ApiProperty({
    description: "User e-mail. Must be unique.",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: "User name",
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: "If user is Admin. Not required.",
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  admin: boolean;
}
