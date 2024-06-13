import { IsString } from 'class-validator';

class UpdateUserDTO {
  userId: string;

  @IsString()
  name: string;
}

export default UpdateUserDTO;
