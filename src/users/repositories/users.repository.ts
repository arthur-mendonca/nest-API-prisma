import { UserEntity } from "../entities/user.entity";

export abstract class UsersRepository {
  abstract findByEmail(email: string): Promise<UserEntity>;
}
