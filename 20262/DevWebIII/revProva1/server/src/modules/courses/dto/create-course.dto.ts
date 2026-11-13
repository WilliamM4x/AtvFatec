import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty({ message: 'O nome do curso é obrigatório.' })
  @IsString({ message: 'O nome do curso deve ser um texto válido.' })
  @MinLength(3, { message: 'O nome do curso deve ter pelo menos 3 caracteres.' })
  @MaxLength(100, { message: 'O nome do curso deve ter no máximo 100 caracteres.' })
  name!: string;

  @IsInt({message: "A carga horária deve ser um número inteiro."})
  @Min(1, {message: "A carga horária deve ser maior que zero."})
  @Max(99, {message: "A carga horária deve ser menor que 100 horas."})
  workload!: number
}
