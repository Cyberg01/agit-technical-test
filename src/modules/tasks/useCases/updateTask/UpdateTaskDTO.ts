import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

class UpdateTaskDTO {
  @IsUUID()
  taskId: string;

  @IsOptional()
  @IsUUID()
  userID?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsBoolean()
  isDone?: boolean;
}

export default UpdateTaskDTO;
