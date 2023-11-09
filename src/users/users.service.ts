/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersPrismaRepository } from "./repositories/prisma/users.prisma.repository";
import { NotFoundError } from "src/common/errors/types/NotFoundError";
import { UserEntity } from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(private readonly repository: UsersPrismaRepository) {}

  async create(createUserDto: CreateUserDto) {
    return await this.repository.create(createUserDto);
  }

  findAll() {
    return this.repository.findAll();
  }

  async findOne(id: number): Promise<UserEntity> {
    const user = await this.repository.findOne(id);

    if (!user) {
      throw new NotFoundError("Usuário não encontrado.");
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.repository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.repository.remove(id);
  }

  async findByEmail(email: string) {
    const findUser = await this.repository.findByEmail(email);

    if (!findUser) {
      throw new NotFoundException("User with this e-mail not found");
    }
    return findUser;
  }
}
