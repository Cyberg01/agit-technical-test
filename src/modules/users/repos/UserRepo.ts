import { NotFoundError, Service } from '@aptana/multichannel-common';
import { Op } from 'sequelize';
import UserModel from '@/infrastructure/database/sequelize/models/user';
import { User } from '../domain/User';
import { UserMapper } from '../mappers/UserMapper';

@Service()
export default class UserRepo {
    constructor(
        private user = UserModel
    ) {
        // 
    }

    async save(user: User): Promise<any> {
        const rawUser = UserMapper.toPersistence(user);
        const savedUser = await this.user.create(rawUser);
        return UserMapper.toObject(savedUser.get({ plain: true }));
    }

    async find(query: any): Promise<any> {
        return await this.user.findAll({ where: query });
    }

    async list(req: any): Promise<any> {
        const { filter = {}, search, page, sort } = req;
        const where = { ...filter };

        if (search?.value && search?.fields?.length) {
            where[Op.or as any] = search.fields.map((field: string) => ({
                [field]: { [Op.like]: `%${search.value}%` }
            }));
        }

        const result = await this.user.findAndCountAll({
            where,
            limit: page?.limit ? Number(page.limit) : undefined,
            offset: page?.offset ? Number(page.offset) : undefined,
            order: sort ? [String(sort).split(':') as [string, string]] : undefined,
        });

        return {
            ...result,
            rows: result.rows.map((user: any) => UserMapper.toObject(user.get({ plain: true })))
        };
    }

    async update(user: User): Promise<any> {
        const { id, ...rest } = this.clean(UserMapper.toPersistence(user));
        const [updated] = await this.user.update(rest, { where: { id } });

        if (!updated) {
            throw new NotFoundError();
        }

        return await this.show(id);
    }

    async updateByQuery(query: any, update: any): Promise<any> {
        const [updated] = await this.user.update(this.clean(update), { where: query });

        if (!updated) {
            throw new NotFoundError();
        }

        return await this.showByQuery(query);
    }

    async show(id: string): Promise<any> {
        const user = await this.user.findByPk(id);
        return user ? UserMapper.toObject(user.get({ plain: true })) : null;
    }

    async showByQuery(query: any): Promise<any> {
        const user = await this.user.findOne({ where: query });
        return user ? UserMapper.toObject(user.get({ plain: true })) : null;
    }

    async showRawByQuery(query: any): Promise<any> {
        const user = await this.user.findOne({ where: query });
        return user ? user.get({ plain: true }) : null;
    }

    async destroy(id: string): Promise<any> {
        return !!await this.user.destroy({ where: { id } });
    }

    async destroyByQuery(query: any): Promise<any> {
        return !!await this.user.destroy({ where: query, limit: 1 });
    }

    private clean(data: any): any {
        return Object.fromEntries(Object.entries(data).filter(([, value]) => value !== undefined));
    }
}