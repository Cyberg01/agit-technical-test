import CreateUserController from '@/modules/users/useCases/createUser/CreateUserController';
import DeleteUserController from '@/modules/users/useCases/deleteUser/DeleteUserController';
import ListUserController from '@/modules/users/useCases/listUser/ListUserController';
import LoginUserController from '@/modules/users/useCases/loginUser/LoginUserController';
import ShowUserController from '@/modules/users/useCases/showUser/ShowUserController';
import UpdateUserController from '@/modules/users/useCases/updateUser/UpdateUserController';
import { App } from '@aptana/multichannel-common';

const app = new App([
  CreateUserController,
  LoginUserController,
  ListUserController,
  ShowUserController,
  UpdateUserController,
  DeleteUserController,
], {
  health: {
    rmq: true,
  },
});

app.start();
