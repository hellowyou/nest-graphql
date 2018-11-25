import { Validator, ValidationSchema } from 'class-validator';
import {
  Column,
  Repository,
  Entity,
  createConnection,
  Connection,
  getManager,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exists } from './exists';
import {
  checkReturnedError,
  checkInvalidValues,
  checkValidValues,
  testConnectionOptions,
} from '../../../../test/helpers';
import { DatabaseSelectValidationOptions } from '../../interfaces';

describe('Exists decorator', () => {
  jest.setTimeout(3000);
  let connection: Connection;
  let repo: Repository<CustomEntity>;
  const nonExisting = ['record1', 'record2'];
  const existing = ['existingData1', 'existingData2'];

  @Entity()
  class CustomEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    customProp: string;
  }

  const constraints: DatabaseSelectValidationOptions<CustomEntity> = {
    entity: CustomEntity,
  };

  class CustomClass {
    @Exists(constraints)
    customProp: any;
  }

  beforeAll(
    async () =>
      (connection = await createConnection({
        ...testConnectionOptions,
        entities: [CustomEntity],
      })),
  );
  beforeEach(async () => connection.synchronize(true));
  beforeEach(() => (repo = connection.getRepository(CustomEntity)));
  beforeEach(async () =>
    repo
      .createQueryBuilder()
      .insert()
      .values(existing.map(customProp => repo.create({ customProp })))
      .execute(),
  );
  afterAll(async () => connection.close());

  it('should not fail if the record exists', async () => {
    await checkValidValues(new CustomClass(), existing);
  });

  it('should fail if no record exists', async () => {
    await checkInvalidValues(new CustomClass(), nonExisting);
  });

  it('should not fail if no record exists, but given an additional existing query clause', async () => {
    const id = 1;
    const query = query => query.orWhere('id = :id', { id });
    const nonExisting1 = nonExisting[0];
    class CustomClass2 extends CustomClass {
      @Exists({ ...constraints, query })
      customProp: string;
    }

    await checkValidValues(new CustomClass2(), [nonExisting1]);
  });

  it('should not fail if validator.validate said that its valid with skipMissingProperties set to true', () => {
    return checkValidValues(new CustomClass(), existing, {
      skipMissingProperties: true,
    });
  });

  it('should fail if validator.validate said that its invalid with skipMissingProperties set to true', () => {
    return checkInvalidValues(new CustomClass(), nonExisting, {
      skipMissingProperties: true,
    });
  });

  it('should return error object with proper data', () => {
    const validationType = 'exists';
    const message = 'The given customProp does not exists.';

    return checkReturnedError(
      new CustomClass(),
      nonExisting,
      validationType,
      message,
    );
  });
});
