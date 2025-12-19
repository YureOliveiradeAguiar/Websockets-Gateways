import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateItemDto {
  @IsString()
  @IsNotEmpty({message: "Name is required"})
  @Length(3, 100, { message: 'Name must be between 3 and 100 characters' })
  name: string;

  @IsString()
  description: string;
}

/*
@IsNotEmpty()
@IsString()
@IsEmail()
@Length(min, max)
@Min(value)
@Max(value)
@Matches(/regex/)
@IsOptional()
*/