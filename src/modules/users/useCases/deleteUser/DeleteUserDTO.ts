import { IsString } from 'class-validator';

class DeleteUserDTO {
  @IsString()
  name: string;
}

export default DeleteUserDTO;
