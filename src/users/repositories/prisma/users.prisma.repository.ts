/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "../../dto/create-user.dto";
import { UpdateUserDto } from "../../dto/update-user.dto";
import { UserEntity } from "../../entities/user.entity";

@Injectable()
export class UsersPrismaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findAll() {
    const user = await this.prisma.user.findMany({
      include: {
        posts: {
          select: {
            title: true,
            published: true,
            createdAt: true,
          },
        },
      },
    });
    return user;
  }

  async findOne(id: number): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
    return user;
  }

  async remove(id: number) {
    await this.prisma.user.delete({
      where: { id },
    });
    return;
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.prisma.user.findFirst({
      where: { email },
    });
    return user;
  }
}

//Esta camada de repositório serve para que o ORM, no caso o Prisma, lide com o service.
//Sua vantagem é possibilitar uma troca fácil por outro ORM (TypeORM, por ex.), bastando alterar o código nos arquivos de repository;
//No final das contas, este arquivo vai funcionar como um service e as regras de negócio se concentram nesta camada.
// O  UsersService propriamente dito vai importar este UsersRepository
