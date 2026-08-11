import { IsOptional, IsString, IsUUID } from 'class-validator';

class CreateTaskDTO {
  @IsUUID()
  userID: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  city?: string;
}

export default CreateTaskDTO;
