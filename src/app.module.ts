/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';


@Module({
    imports: [ConfigModule, UsersModule, PostsModule, AuthModule],
    controllers: [AppController],
    providers: [AppService],

})

export class AppModule {}

