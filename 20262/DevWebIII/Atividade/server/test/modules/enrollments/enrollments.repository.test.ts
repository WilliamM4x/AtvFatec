import type { Database } from '../../../src/database/connection';
import {
  type Enrollment,
  PgEnrollmentRepository,
} from '../../../src/modules/enrollments/enrollments.repository';

function normalizeSql(sql: string): string {
  return sql.replace(/\s+/g, ' ').trim();
}

describe('PgEnrollmentRepository', () => {
  const fixedDate = new Date('2026-03-01T12:00:00.000Z');
  let queryMock: jest.Mock;
  let db: Database;
  let repository: PgEnrollmentRepository;

  beforeEach(() => {
    queryMock = jest.fn();
    db = { query: queryMock };
    repository = new PgEnrollmentRepository(db);
  });

  it('create insere student_ra e course_id em enrollments com $1, $2 e aliases em camelCase', async () => {
    const created: Enrollment = {
      studentRa: 123,
      courseId: 7,
      enrolledAt: fixedDate,
    };
    queryMock.mockResolvedValue({ rows: [created] });

    const result = await repository.create(123, 7);

    expect(result).toEqual(created);
    expect(result.enrolledAt).toBe(fixedDate);
    expect(queryMock).toHaveBeenCalledTimes(1);
    const [sql, params] = queryMock.mock.calls[0] as [string, unknown[]];
    expect(normalizeSql(sql)).toBe(
      'INSERT INTO enrollments (student_ra, course_id) VALUES ($1, $2) RETURNING student_ra AS "studentRa", course_id AS "courseId", enrolled_at AS "enrolledAt"',
    );
    expect(params).toEqual([123, 7]);
  });

  it('findAll retorna os registros simulados ordenados por student_ra, course_id sem array de parâmetros', async () => {
    const enrollments: Enrollment[] = [
      { studentRa: 123, courseId: 7, enrolledAt: fixedDate },
      { studentRa: 456, courseId: 8, enrolledAt: fixedDate },
    ];
    queryMock.mockResolvedValue({ rows: enrollments });

    const result = await repository.findAll();

    expect(result).toEqual(enrollments);
    expect(queryMock).toHaveBeenCalledTimes(1);
    expect(queryMock.mock.calls[0]).toHaveLength(1);
    const [sql] = queryMock.mock.calls[0] as [string];
    expect(normalizeSql(sql)).toBe(
      'SELECT student_ra AS "studentRa", course_id AS "courseId", enrolled_at AS "enrolledAt" FROM enrollments ORDER BY student_ra, course_id',
    );
  });

  it('findAll retorna [] quando rows está vazio', async () => {
    queryMock.mockResolvedValue({ rows: [] });

    const result = await repository.findAll();

    expect(result).toEqual([]);
  });

  it('findOne retorna a primeira matrícula encontrada filtrando por student_ra = $1 AND course_id = $2', async () => {
    const enrollment: Enrollment = {
      studentRa: 123,
      courseId: 7,
      enrolledAt: fixedDate,
    };
    queryMock.mockResolvedValue({ rows: [enrollment] });

    const result = await repository.findOne(123, 7);

    expect(result).toEqual(enrollment);
    expect(result?.enrolledAt).toBe(fixedDate);
    expect(queryMock).toHaveBeenCalledTimes(1);
    const [sql, params] = queryMock.mock.calls[0] as [string, unknown[]];
    expect(normalizeSql(sql)).toBe(
      'SELECT student_ra AS "studentRa", course_id AS "courseId", enrolled_at AS "enrolledAt" FROM enrollments WHERE student_ra = $1 AND course_id = $2',
    );
    expect(params).toEqual([123, 7]);
  });

  it('findOne retorna undefined quando rows está vazio', async () => {
    queryMock.mockResolvedValue({ rows: [] });

    const result = await repository.findOne(123, 7);

    expect(result).toBeUndefined();
  });

  it('create propaga exatamente a mesma instância de Error lançada pelo banco', async () => {
    const dbError = new Error('Falha no INSERT');
    queryMock.mockRejectedValue(dbError);

    await expect(repository.create(123, 7)).rejects.toBe(dbError);
  });

  it('findAll propaga exatamente a mesma instância de Error lançada pelo banco', async () => {
    const dbError = new Error('Falha no SELECT');
    queryMock.mockRejectedValue(dbError);

    await expect(repository.findAll()).rejects.toBe(dbError);
  });

  it('findOne propaga exatamente a mesma instância de Error lançada pelo banco', async () => {
    const dbError = new Error('Falha no SELECT por chave composta');
    queryMock.mockRejectedValue(dbError);

    await expect(repository.findOne(123, 7)).rejects.toBe(dbError);
  });
});

