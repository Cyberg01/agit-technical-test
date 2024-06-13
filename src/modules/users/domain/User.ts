import mongoose from 'mongoose';
import { Entity, UniqueId } from '@amirmarmul/waba-common';

export interface UserProps {
    name: string;
}

export class User extends Entity<UserProps> {
    get id() {
        return this._id;
    }

    get name(): string {
        return this.props.name;
    }

    private constructor(props: UserProps, id?: UniqueId) {
        super(props, id);
    }

    public static create(props: UserProps, id?: UniqueId): User {
        const user = new User(props, id);

        return user;
    }
}

export type UserContract = User & mongoose.Document;
