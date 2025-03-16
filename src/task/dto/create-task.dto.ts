import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTaskDto {

    @IsString()
    @IsNotEmpty({ message: 'Title is required' })
    title : string;

    @IsString()
    @IsNotEmpty({ message: 'Description is required' })
    description: string;

    @IsOptional()
    @IsString()
    category : string = 'default';

    @IsBoolean()
    readonly is_completed: boolean = false;
}
