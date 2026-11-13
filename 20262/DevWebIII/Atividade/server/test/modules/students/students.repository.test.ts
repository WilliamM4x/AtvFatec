import type { Database } from '../../../src/database/connection';
import {
  PgStudentRepository,
  type Student,
} from '../../../src/modules/students/students.repository';

function normalizeSql(sql: string): string {
  return sql.replace(/\s+/g, ' ').trim();
}

describe('PgStudentRepository', () => {
  let queryMock: jest.Mock;
  let db: Database;
  let repository: PgStudentRepository;

  beforeEach(() => {
    queryMock = jest.fn();
    db = { query: queryMock };
    repository = new PgStudentRepository(db);
  });

  it('create insere ra e name em students com $1, $2 e devolve o registro criado', async () => {
    const created: Student = { ra: 123, name: 'Ana' };
    queryMock.mockResolvedValue({ rows: [created] });

    const result = await repository.create({ ra: 123, name: 'Ana' });

    expect(result).toEqual(created);
    expect(queryMock).toHaveBeenCalledTimes(1);
    const [sql, params] = queryMock.mock.calls[0] as [string, unknown[]];
    expect(normalizeSql(sql)).toBe(
      'INSERT INTO students (ra, name) VALUES ($1, $2) RETURNING ra, name',
    );
    expect(params).toEqual([123, 'Ana']);
  });

  it('findAll retorna os registros simulados ordenados por name sem array de parâmetros', async () => {
    const students: Student[] = [
      { ra: 123, name: 'Ana' },
      { ra: 456, name: 'Bruno' },
    ];
    queryMock.mockResolvedValue({ rows: students });

    const result = await repository.findAll();

    expect(result).toEqual(students);
    expect(queryMock).toHaveBeenCalledTimes(1);
    expect(queryMock.mock.calls[0]).toHaveLength(1);
    const [sql] = queryMock.mock.calls[0] as [string];
    expect(normalizeSql(sql)).toBe('SELECT ra, name FROM students ORDER BY name');
  });

  it('findAll retorna [] quando rows está vazio', async () => {
    queryMock.mockResolvedValue({ rows: [] });

    const result = await repository.findAll();

    expect(result).toEqual([]);
  });

  it('findOne retorna o primeiro registro encontrado e filtra por ra = $1', async () => {
    const student: Student = { ra: 123, name: 'Ana' };
    queryMock.mockResolvedValue({ rows: [student] });

    const result = await repository.findOne(123);

    expect(result).toEqual(student);
    expect(queryMock).toHaveBeenCalledTimes(1);
    const [sql, params] = queryMock.mock.calls[0] as [string, unknown[]];
    expect(normalizeSql(sql)).toBe('SELECT ra, name FROM students WHERE ra = $1');
    expect(params).toEqual([123]);
  });

  it('findOne retorna undefined quando rows está vazio', async () => {
    queryMock.mockResolvedValue({ rows: [] });

    const result = await repository.findOne(123);

    expect(result).toBeUndefined();
  });

  it('create propaga exatamente a mesma instância de Error lançada pelo banco', async () => {
    const dbError = new Error('Falha no INSERT');
    queryMock.mockRejectedValue(dbError);

    await expect(repository.create({ ra: 123, name: 'Ana' })).rejects.toBe(dbError);
  });

  it('findAll propaga exatamente a mesma instância de Error lançada pelo banco', async () => {
    const dbError = new Error('Falha no SELECT');
    queryMock.mockRejectedValue(dbError);

    await expect(repository.findAll()).rejects.toBe(dbError);
  });

  it('findOne propaga exatamente a mesma instância de Error lançada pelo banco', async () => {
    const dbError = new Error('Falha no SELECT por ra');
    queryMock.mockRejectedValue(dbError);

    await expect(repository.findOne(123)).rejects.toBe(dbError);
  });
});

