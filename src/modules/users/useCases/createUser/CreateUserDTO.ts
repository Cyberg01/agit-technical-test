import { IsEmail, IsString, MinLength } from 'class-validator';

class CreateAccountDTO {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}

export default CreateAccountDTO;
