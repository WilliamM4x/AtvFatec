import { HttpError } from '../../../src/errors';
import type {
  Enrollment,
  EnrollmentRepository,
} from '../../../src/modules/enrollments/enrollments.repository';
import { EnrollmentsService } from '../../../src/modules/enrollments/enrollments.service';

function createRepositoryMock(): jest.Mocked<EnrollmentRepository> {
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

describe('EnrollmentsService', () => {
  const fixedDate = new Date('2026-03-01T12:00:00.000Z');
  let repository: jest.Mocked<EnrollmentRepository>;
  let service: EnrollmentsService;

  beforeEach(() => {
    repository = createRepositoryMock();
    service = new EnrollmentsService(repository);
  });

  it('cria uma matrícula válida enviando studentRa e courseId separados na ordem correta', async () => {
    const created: Enrollment = {
      studentRa: 123,
      courseId: 1,
      enrolledAt: fixedDate,
    };
    repository.create.mockResolvedValue(created);

    const result = await service.create({ studentRa: 123, courseId: 1 });

    expect(result).toEqual(created);
    expect(repository.create).toHaveBeenCalledTimes(1);
    expect(repository.create).toHaveBeenCalledWith(123, 1);
  });

  it.each([
    ['studentRa inválido (0)', { studentRa: 0, courseId: 1 }],
    ['courseId inválido (0)', { studentRa: 123, courseId: 0 }],
  ])('lança HttpError 400 para %s sem chamar repository.create', async (_label, input) => {
    await expectHttpError(service.create(input), 400);
    expect(repository.create).not.toHaveBeenCalled();
  });

  it('lança HttpError 404 quando repository.create rejeita com violação de chave estrangeira (23503)', async () => {
    repository.create.mockRejectedValue({ code: '23503' });

    await expectHttpError(service.create({ studentRa: 123, courseId: 1 }), 404);
  });

  it('lança HttpError 409 quando repository.create rejeita com violação de unicidade (23505)', async () => {
    repository.create.mockRejectedValue({ code: '23505' });

    await expectHttpError(service.create({ studentRa: 123, courseId: 1 }), 409);
  });

  it('lança HttpError 404 quando matrícula não é encontrada e repassa os dois IDs na ordem correta', async () => {
    repository.findOne.mockResolvedValue(undefined);

    await expectHttpError(service.findOne(123, 1), 404);
    expect(repository.findOne).toHaveBeenCalledTimes(1);
    expect(repository.findOne).toHaveBeenCalledWith(123, 1);
  });

  it('propaga exatamente a mesma instância de Error em falha inesperada na criação', async () => {
    const unexpectedError = new Error('Falha inesperada');
    repository.create.mockRejectedValue(unexpectedError);

    await expect(service.create({ studentRa: 123, courseId: 1 })).rejects.toBe(unexpectedError);
  });

  it('lista matrículas e chama repository.findAll uma única vez sem argumentos', async () => {
    const enrollments: Enrollment[] = [
      { studentRa: 123, courseId: 1, enrolledAt: fixedDate },
      { studentRa: 456, courseId: 2, enrolledAt: fixedDate },
    ];
    repository.findAll.mockResolvedValue(enrollments);

    const result = await service.findAll();

    expect(result).toEqual(enrollments);
    expect(repository.findAll).toHaveBeenCalledTimes(1);
    expect(repository.findAll).toHaveBeenCalledWith();
  });

  it('retorna matrícula existente e chama repository.findOne uma única vez com ambos os identificadores', async () => {
    const enrollment: Enrollment = {
      studentRa: 123,
      courseId: 1,
      enrolledAt: fixedDate,
    };
    repository.findOne.mockResolvedValue(enrollment);

    const result = await service.findOne(123, 1);

    expect(result).toEqual(enrollment);
    expect(repository.findOne).toHaveBeenCalledTimes(1);
    expect(repository.findOne).toHaveBeenCalledWith(123, 1);
  });
});

