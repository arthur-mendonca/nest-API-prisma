/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { UsersPrismaRepository } from "./repositories/prisma/users.prisma.repository";

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, UsersPrismaRepository],
  exports: [UsersService],
})
export class UsersModule {}
