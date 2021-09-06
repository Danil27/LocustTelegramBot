import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
export class CreateURLRequest {

    @IsString()
    @IsOptional()
    paramName: string

    @IsString()
    @IsOptional()
    name?: string;

    @IsBoolean()
    @IsOptional()
    validate?: boolean;
  
    @IsString()
    url: string;

    @IsString()
    @IsOptional()
    data?: string;

    @IsString()
    @IsOptional()
    plus?: string;
  
    @IsString()
    method: string;
  
    @IsString()
    @IsOptional()
    сontentType?: string;
  
    @IsString()
    @IsOptional()
    accept?: string;
}
