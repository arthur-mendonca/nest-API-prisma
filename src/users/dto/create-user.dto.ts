/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { hashSync } from "bcryptjs";
import { Transform } from "class-transformer";
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
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

  @ApiProperty({ description: "Insert user password" })
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @Transform(({ value }: { value: string }) => hashSync(value, 10), {
    groups: ["transform"],
  })
  password: string;

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
