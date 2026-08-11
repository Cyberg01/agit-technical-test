import { Mapper, UniqueId } from '@aptana/multichannel-common';
import { User } from '../domain/User';

export class UserMapper extends Mapper<User> {
  public static toDomain(raw: any): User {
    const user = User.create({
      name: raw.name,
      email: raw.email,
      password: raw.password
    }, new UniqueId(raw.id));

    return user;
  }

  public static toPersistence(user: User): any {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      password: user.password
    };
  }

  public static toObject(user: any) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }
  }
}
