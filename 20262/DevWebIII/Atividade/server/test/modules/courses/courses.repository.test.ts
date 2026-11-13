import type { Database } from '../../../src/database/connection';
import {
  type Course,
  PgCourseRepository,
} from '../../../src/modules/courses/courses.repository';

function normalizeSql(sql: string): string {
  return sql.replace(/\s+/g, ' ').trim();
}

describe('PgCourseRepository', () => {
  let queryMock: jest.Mock;
  let db: Database;
  let repository: PgCourseRepository;

  beforeEach(() => {
    queryMock = jest.fn();
    db = { query: queryMock };
    repository = new PgCourseRepository(db);
  });

  it('create insere name em courses com $1, retorna id e name e devolve o registro criado', async () => {
    const created: Course = { id: 7, name: 'Qualidade' };
    queryMock.mockResolvedValue({ rows: [created] });

    const result = await repository.create({ name: 'Qualidade' });

    expect(result).toEqual(created);
    expect(queryMock).toHaveBeenCalledTimes(1);
    const [sql, params] = queryMock.mock.calls[0] as [string, unknown[]];
    expect(normalizeSql(sql)).toBe('INSERT INTO courses (name) VALUES ($1) RETURNING id, name');
    expect(params).toEqual(['Qualidade']);
  });

  it('findAll retorna os registros simulados sem passar array de parâmetros', async () => {
    const courses: Course[] = [
      { id: 1, name: 'Algoritmos' },
      { id: 2, name: 'Qualidade' },
    ];
    queryMock.mockResolvedValue({ rows: courses });

    const result = await repository.findAll();

    expect(result).toEqual(courses);
    expect(queryMock).toHaveBeenCalledTimes(1);
    expect(queryMock.mock.calls[0]).toHaveLength(1);
    const [sql] = queryMock.mock.calls[0] as [string];
    expect(normalizeSql(sql)).toBe('SELECT id, name FROM courses ORDER BY id');
  });

  it('findAll retorna [] quando rows está vazio', async () => {
    queryMock.mockResolvedValue({ rows: [] });

    const result = await repository.findAll();

    expect(result).toEqual([]);
  });

  it('findOne retorna o primeiro registro encontrado e filtra por id = $1', async () => {
    const course: Course = { id: 7, name: 'Qualidade' };
    queryMock.mockResolvedValue({ rows: [course] });

    const result = await repository.findOne(7);

    expect(result).toEqual(course);
    expect(queryMock).toHaveBeenCalledTimes(1);
    const [sql, params] = queryMock.mock.calls[0] as [string, unknown[]];
    expect(normalizeSql(sql)).toBe('SELECT id, name FROM courses WHERE id = $1');
    expect(params).toEqual([7]);
  });

  it('findOne retorna undefined quando rows está vazio', async () => {
    queryMock.mockResolvedValue({ rows: [] });

    const result = await repository.findOne(7);

    expect(result).toBeUndefined();
  });

  it('create propaga exatamente a mesma instância de Error lançada pelo banco', async () => {
    const dbError = new Error('Falha no INSERT');
    queryMock.mockRejectedValue(dbError);

    await expect(repository.create({ name: 'Qualidade' })).rejects.toBe(dbError);
  });

  it('findAll propaga exatamente a mesma instância de Error lançada pelo banco', async () => {
    const dbError = new Error('Falha no SELECT');
    queryMock.mockRejectedValue(dbError);

    await expect(repository.findAll()).rejects.toBe(dbError);
  });

  it('findOne propaga exatamente a mesma instância de Error lançada pelo banco', async () => {
    const dbError = new Error('Falha no SELECT por id');
    queryMock.mockRejectedValue(dbError);

    await expect(repository.findOne(7)).rejects.toBe(dbError);
  });
});

