import { Mapper, UniqueId } from '@amirmarmul/waba-common';
import { User } from '../domain/User';

export class UserMapper extends Mapper<User> {
  public static toDomain(raw: any): User {
    const user = User.create({
      name: raw.name
    }, new UniqueId(raw._id));

    return user;
  }

  public static toPersistence(user: User): any {
    return {
      _id: user.id.toString(),
      name: user.name
    };
  }

  public static toObject(user: any) {
    return {
      id: user.id,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }
  }
}
