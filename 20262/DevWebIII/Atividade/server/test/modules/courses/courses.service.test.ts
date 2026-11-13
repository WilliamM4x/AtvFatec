import { HttpError } from '../../../src/errors';
import type { Course, CourseRepository } from '../../../src/modules/courses/courses.repository';
import { CoursesService } from '../../../src/modules/courses/courses.service';

function createRepositoryMock(): jest.Mocked<CourseRepository> {
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

describe('CoursesService', () => {
  let repository: jest.Mocked<CourseRepository>;
  let service: CoursesService;

  beforeEach(() => {
    repository = createRepositoryMock();
    service = new CoursesService(repository);
  });

  it('cria uma disciplina válida e chama repository.create uma única vez', async () => {
    const created: Course = { id: 1, name: 'Qualidade' };
    repository.create.mockResolvedValue(created);

    const result = await service.create({ name: 'Qualidade' });

    expect(result).toEqual(created);
    expect(repository.create).toHaveBeenCalledTimes(1);
    expect(repository.create).toHaveBeenCalledWith({ name: 'Qualidade' });
  });

  it.each([
    ['null', null],
    ['objeto vazio', {}],
    ['nome muito curto', { name: 'A' }],
  ])('lança HttpError 400 na criação inválida (%s) sem chamar repository.create', async (_label, input) => {
    await expectHttpError(service.create(input), 400);
    expect(repository.create).not.toHaveBeenCalled();
  });

  it('lança HttpError 409 quando repository.create rejeita com erro de unicidade (23505)', async () => {
    repository.create.mockRejectedValue({ code: '23505' });

    await expectHttpError(service.create({ name: 'Qualidade' }), 409);
  });

  it('lista disciplinas usando stub de findAll', async () => {
    const courses: Course[] = [
      { id: 1, name: 'Qualidade' },
      { id: 2, name: 'Arquitetura' },
    ];
    const stubRepository: CourseRepository = {
      create: async () => ({ id: 1, name: 'Qualidade' }),
      findAll: async () => courses,
      findOne: async () => undefined,
    };
    const findAllSpy = jest.spyOn(stubRepository, 'findAll');
    const stubService = new CoursesService(stubRepository);

    const result = await stubService.findAll();

    expect(result).toEqual(courses);
    expect(findAllSpy).toHaveBeenCalledTimes(1);
    expect(findAllSpy).toHaveBeenCalledWith();
  });

  it('retorna a disciplina encontrada ao buscar por id existente', async () => {
    const course: Course = { id: 123, name: 'Qualidade' };
    repository.findOne.mockResolvedValue(course);

    const result = await service.findOne(123);

    expect(result).toEqual(course);
    expect(repository.findOne).toHaveBeenCalledTimes(1);
    expect(repository.findOne).toHaveBeenCalledWith(123);
  });

  it('lança HttpError 404 quando a disciplina não é encontrada', async () => {
    repository.findOne.mockResolvedValue(undefined);

    await expectHttpError(service.findOne(123), 404);
    expect(repository.findOne).toHaveBeenCalledWith(123);
  });

  it('lança HttpError 400 ao buscar com id inválido (0) sem consultar o repositório', async () => {
    await expectHttpError(service.findOne(0), 400);
    expect(repository.findOne).not.toHaveBeenCalled();
  });

  it('propaga exatamente a mesma instância de Error em falha inesperada de create', async () => {
    const unexpectedError = new Error('Falha de conexão');
    repository.create.mockRejectedValue(unexpectedError);

    await expect(service.create({ name: 'Qualidade' })).rejects.toBe(unexpectedError);
  });

  it('propaga exatamente a mesma instância de Error em falha inesperada de findAll', async () => {
    const unexpectedError = new Error('Falha ao listar');
    repository.findAll.mockRejectedValue(unexpectedError);

    await expect(service.findAll()).rejects.toBe(unexpectedError);
  });

  it('propaga exatamente a mesma instância de Error em falha inesperada de findOne', async () => {
    const unexpectedError = new Error('Falha ao buscar');
    repository.findOne.mockRejectedValue(unexpectedError);

    await expect(service.findOne(123)).rejects.toBe(unexpectedError);
  });

  it('observa findOne de um stub existente com jest.spyOn', async () => {
    const expected: Course = { id: 1, name: 'Qualidade' };
    const stubRepository: CourseRepository = {
      create: async () => expected,
      findAll: async () => [expected],
      findOne: async (id: number) => (id === 1 ? expected : undefined),
    };
    const findOneSpy = jest.spyOn(stubRepository, 'findOne');
    const spyService = new CoursesService(stubRepository);

    const result = await spyService.findOne(1);

    expect(result).toEqual(expected);
    expect(findOneSpy).toHaveBeenCalledTimes(1);
    expect(findOneSpy).toHaveBeenCalledWith(1);
  });

  it('descarta campos extras e envia somente { name } ao repositório', async () => {
    const created: Course = { id: 1, name: 'Qualidade' };
    repository.create.mockResolvedValue(created);

    await service.create({ name: 'Qualidade', extra: true });

    expect(repository.create).toHaveBeenCalledTimes(1);
    expect(repository.create).toHaveBeenCalledWith({ name: 'Qualidade' });
  });
});
