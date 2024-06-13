import { IsString } from 'class-validator';

class CreateAccountDTO {
  @IsString()
  name: string;
}

export default CreateAccountDTO;
