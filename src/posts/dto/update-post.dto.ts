/* eslint-disable prettier/prettier */
import { PartialType } from "@nestjs/swagger";
import { CreatePostDto } from "./create-post.dto";

export class UpdatePostDto extends PartialType(CreatePostDto) {}
