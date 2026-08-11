import mongoose from 'mongoose';
import { NotFoundError, Pagination, Service } from '@aptana/multichannel-common';
import { User, UserContract } from '../domain/User';
import { UserMapper } from '../mappers/UserMapper';

@Service()
export default class UserRepo {
    constructor(
        private user = mongoose.model<UserContract, Pagination<UserContract>>('User')
    ) {
        // 
    }

    async save(user: User): Promise<any> {
        const rawUser = UserMapper.toPersistence(user);
        return await this.user.create(rawUser);
    }

    async find(query: any): Promise<any> {
        return await this.user.find(query);
    }

    async list(req: any): Promise<any> {
        const { filter: query, search, page, sort } = req;
        return await this.user.paginate({ query, search, page, sort });
    }

    async update(user: User): Promise<any> {
        const { _id, ...rest } = UserMapper.toPersistence(user);
        return await this.user.findByIdAndUpdate(_id, rest, { new: true })
            .orFail(new NotFoundError());
    }

    async updateByQuery(query: any, update: any): Promise<any> {
        return await this.user.findOneAndUpdate(query, update, { new: true })
            .orFail(new NotFoundError());
    }

    async show(id: string): Promise<any> {
        return await this.user.findById(id);
    }

    async showByQuery(query: any): Promise<any> {
        return await this.user.findOne(query);
    }

    async destroy(id: string): Promise<any> {
        const user = await this.user.findByIdAndRemove(id);
        return !!user;
    }

    async destroyByQuery(query: any): Promise<any> {
        const user = await this.user.findOneAndRemove(query);
        return !!user;
    }
}