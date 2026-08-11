import { IsEmail, IsString } from 'class-validator';

class LoginUserDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export default LoginUserDTO;
