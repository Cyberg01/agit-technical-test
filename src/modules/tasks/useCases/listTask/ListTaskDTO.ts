import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';

class PageListTaskDTO {
  @IsString()
  limit: string;

  @IsString()
  offset: string;
}

class FilterListTaskDTO {
  id?: string;
  userID?: string;
  title?: string;
  city?: string;
  isDone?: boolean;
}

class SearchListTaskDTO {
  @IsString()
  value: string;

  @IsString({ each: true })
  fields: string[];
}

class ListTaskDTO {
  @IsOptional()
  @ValidateNested()
  @Type(() => PageListTaskDTO)
  page?: PageListTaskDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => SearchListTaskDTO)
  search?: SearchListTaskDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => FilterListTaskDTO)
  filter?: FilterListTaskDTO;

  @IsOptional()
  sort?: String;
}

export default ListTaskDTO;
