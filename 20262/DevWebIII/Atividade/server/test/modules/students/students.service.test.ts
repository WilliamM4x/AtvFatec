import { HttpError } from '../../../src/errors';
import type { Student, StudentRepository } from '../../../src/modules/students/students.repository';
import { StudentsService } from '../../../src/modules/students/students.service';

function createRepositoryMock(): jest.Mocked<StudentRepository> {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
  };
}

async function expectHttpError(promise: Promise<unknown>, statusCode: number): Promise<void> {
  try {
    await promise;
    throw new Error('Expected HttpError to be thrown');
  } catch (error) {
    expect(error).toBeInstanceOf(HttpError);
    expect((error as HttpError).statusCode).toBe(statusCode);
  }
}

describe('StudentsService', () => {
  let repository: jest.Mocked<StudentRepository>;
  let service: StudentsService;

  beforeEach(() => {
    repository = createRepositoryMock();
    service = new StudentsService(repository);
  });

  it('cria um aluno válido e encaminha { ra, name } ao repositório', async () => {
    const created: Student = { ra: 123, name: 'Ana' };
    repository.create.mockResolvedValue(created);

    const result = await service.create({ ra: 123, name: 'Ana' });

    expect(result).toEqual(created);
    expect(repository.create).toHaveBeenCalledTimes(1);
    expect(repository.create).toHaveBeenCalledWith({ ra: 123, name: 'Ana' });
  });

  it('lança HttpError 400 quando RA é inválido (0) sem chamar repository.create', async () => {
    await expectHttpError(service.create({ ra: 0, name: 'Ana' }), 400);
    expect(repository.create).not.toHaveBeenCalled();
  });

  it('lança HttpError 409 quando repository.create rejeita com erro de unicidade (23505)', async () => {
    repository.create.mockRejectedValue({ code: '23505' });

    await expectHttpError(service.create({ ra: 123, name: 'Ana' }), 409);
  });

  it('lança HttpError 404 quando aluno não é encontrado pelo RA', async () => {
    repository.findOne.mockResolvedValue(undefined);

    await expectHttpError(service.findOne(123), 404);
    expect(repository.findOne).toHaveBeenCalledWith(123);
  });

  it('propaga exatamente a mesma instância de Error em falha inesperada na criação', async () => {
    const unexpectedError = new Error('Falha inesperada');
    repository.create.mockRejectedValue(unexpectedError);

    await expect(service.create({ ra: 123, name: 'Ana' })).rejects.toBe(unexpectedError);
  });

  it('lista alunos e chama repository.findAll uma única vez sem argumentos', async () => {
    const students: Student[] = [
      { ra: 123, name: 'Ana' },
      { ra: 456, name: 'Bruno' },
    ];
    repository.findAll.mockResolvedValue(students);

    const result = await service.findAll();

    expect(result).toEqual(students);
    expect(repository.findAll).toHaveBeenCalledTimes(1);
    expect(repository.findAll).toHaveBeenCalledWith();
  });

  it('retorna aluno existente e chama repository.findOne uma única vez com o RA', async () => {
    const student: Student = { ra: 123, name: 'Ana' };
    repository.findOne.mockResolvedValue(student);

    const result = await service.findOne(123);

    expect(result).toEqual(student);
    expect(repository.findOne).toHaveBeenCalledTimes(1);
    expect(repository.findOne).toHaveBeenCalledWith(123);
  });
});

