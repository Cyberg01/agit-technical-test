import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';

class PageListUserDTO {
  @IsString()
  limit: string;

  @IsString()
  offset: string;
}

class FilterListUserDTO {
  id?: string;
  name?: string;
  email?: string;
}

class SearchListUserDTO {
  @IsString()
  value: string;

  @IsString({ each: true })
  fields: string[];
}

class ListUserDTO {
  @IsOptional()
  @ValidateNested()
  @Type(() => PageListUserDTO)
  page?: PageListUserDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => SearchListUserDTO)
  search?: SearchListUserDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => FilterListUserDTO)
  filter?: FilterListUserDTO;

  @IsOptional()
  sort?: String;
}

export default ListUserDTO;
