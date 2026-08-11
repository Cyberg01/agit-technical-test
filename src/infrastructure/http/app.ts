import CreateUserController from '@/modules/users/useCases/createUser/CreateUserController';
import DeleteUserController from '@/modules/users/useCases/deleteUser/DeleteUserController';
import ListUserController from '@/modules/users/useCases/listUser/ListUserController';
import LoginUserController from '@/modules/users/useCases/loginUser/LoginUserController';
import ShowUserController from '@/modules/users/useCases/showUser/ShowUserController';
import CreateTaskController from '@/modules/tasks/useCases/createTask/CreateTaskController';
import DeleteTaskController from '@/modules/tasks/useCases/deleteTask/DeleteTaskController';
import ListTaskController from '@/modules/tasks/useCases/listTask/ListTaskController';
import ShowTaskController from '@/modules/tasks/useCases/showTask/ShowTaskController';
import UpdateTaskController from '@/modules/tasks/useCases/updateTask/UpdateTaskController';
import UpdateUserController from '@/modules/users/useCases/updateUser/UpdateUserController';
import { App } from '@aptana/multichannel-common';

const app = new App([
  CreateUserController,
  LoginUserController,
  ListUserController,
  ShowUserController,
  UpdateUserController,
  DeleteUserController,
  CreateTaskController,
  ListTaskController,
  ShowTaskController,
  UpdateTaskController,
  DeleteTaskController,
], {
  health: {
    rmq: true,
  },
});

app.start();
