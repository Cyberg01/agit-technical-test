import { Entity, UniqueId } from '@aptana/multichannel-common';

export interface UserProps {
    name: string;
    email: string;
    password: string;
}

export class User extends Entity<UserProps> {
    get id() {
        return this._id;
    }

    get name(): string {
        return this.props.name;
    }

    get email(): string {
        return this.props.email;
    }

    get password(): string {
        return this.props.password;
    }

    private constructor(props: UserProps, id?: UniqueId) {
        super(props, id);
    }

    public static create(props: UserProps, id?: UniqueId): User {
        const user = new User(props, id);

        return user;
    }
}
