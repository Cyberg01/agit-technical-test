import config from '@/config';
import { Service, UseCase, WrongCredentialsError, transformAndValidate } from '@aptana/multichannel-common';
import jwt from 'jsonwebtoken';
import UserRepo from '../../repos/UserRepo';
import LoginUserDTO from './LoginUserDTO';
import { verifyPassword } from '../../utils/password';

@Service()
export default class LoginUser implements UseCase<LoginUserDTO, Promise<any>> {
  constructor(
    private userRepo: UserRepo
  ) {
    //
  }

  async execute(req: LoginUserDTO): Promise<any> {
    const reqData = transformAndValidate(LoginUserDTO, req);
    const user = await this.userRepo.showRawByQuery({ email: reqData.email });

    if (!user || !await verifyPassword(reqData.password, user.password)) {
      throw new WrongCredentialsError();
    }

    const { password, ...safeUser } = user;
    const token = jwt.sign({ userId: user.id, email: user.email }, config.app.jwtSecret, { expiresIn: '1d' });

    return { token, user: safeUser };
  }
}
