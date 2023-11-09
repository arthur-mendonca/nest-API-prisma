import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { PostEntity } from "../entities/post.entity";
import { CreatePostDto } from "../dto/create-post.dto";
import { UpdatePostDto } from "../dto/update-post.dto";
import { Prisma } from "@prisma/client";
import { NotFoundError } from "src/common/errors/types/NotFoundError";

@Injectable()
export class PostsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto): Promise<PostEntity> {
    const { authorEmail } = createPostDto;

    delete createPostDto.authorEmail;

    const user = await this.prisma.user.findUnique({
      where: {
        email: authorEmail,
      },
    });

    if (!user) {
      throw new NotFoundError("Autor não encontrado.");
    }

    const postData: Prisma.PostCreateInput = {
      ...createPostDto,
      author: { connect: { email: authorEmail } },
    };

    return await this.prisma.post.create({
      data: postData,
    });
  }

  async findAll() {
    const post = await this.prisma.post.findMany({
      include: { author: true },
    });
    return post;
  }

  async findOne(id: number): Promise<PostEntity> {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<PostEntity> {
    const { authorEmail } = updatePostDto;

    if (!authorEmail) {
      return this.prisma.post.update({
        where: { id },
        data: updatePostDto,
        include: {
          author: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      });
    }

    delete updatePostDto.authorEmail;

    const user = this.prisma.user.findUnique({
      where: { email: authorEmail },
    });

    if (!user) {
      throw new NotFoundError("Autor não encontrado.");
    }

    const postData: Prisma.PostUpdateInput = {
      ...updatePostDto,
      author: { connect: { email: authorEmail } },
    };

    return this.prisma.post.update({
      where: { id },
      data: postData,
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async remove(id: number) {
    await this.prisma.post.delete({
      where: { id },
    });
  }
}
