import VersionController from '@/modules/service/useCases/version/VersionController';
import CreateUserController from '@/modules/users/useCases/createUser/CreateUserController';
import DeleteUserController from '@/modules/users/useCases/deleteUser/DeleteUserController';
import ListUserController from '@/modules/users/useCases/listUser/ListUserController';
import ShowUserController from '@/modules/users/useCases/showUser/ShowUserController';
import UpdateUserController from '@/modules/users/useCases/updateUser/UpdateUserController';
import { App } from '@amirmarmul/waba-common';

const app = new App([
  // version
  VersionController,

  // users
  CreateUserController,
  ListUserController,
  ShowUserController,
  UpdateUserController,
  DeleteUserController,
]);

app.start();
