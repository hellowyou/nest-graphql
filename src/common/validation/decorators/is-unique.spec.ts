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
import { IsUnique } from './is-unique';
import {
  checkReturnedError,
  checkInvalidValues,
  checkValidValues,
  testConnectionOptions,
} from '../../../../test/helpers';
import { DatabaseSelectValidationOptions } from '../../interfaces';

describe('IsUnique decorator', () => {
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
    @IsUnique(constraints)
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

  it('should not fail if no same record exists', async () => {
    const datas = await repo.find();
    // Check if nonExisting datas are not in the record first.
    await Promise.all(
      datas.map(data => expect(nonExisting).not.toContain(data.customProp)),
    );

    await checkValidValues(new CustomClass(), nonExisting);
  });

  it('should fail if same record exists', async () => {
    await checkInvalidValues(new CustomClass(), existing);
  });

  it('should not fail if same record exists, but given an additional unique query clause', async () => {
    const id = 1;
    const query = query => query.andWhere('id != :id', { id });
    const existing1 = existing[0];
    class CustomClass2 extends CustomClass {
      @IsUnique({ ...constraints, query })
      customProp: string;
    }

    await checkValidValues(new CustomClass2(), [existing1]);
  });

  it('should not fail if validator.validate said that its valid with skipMissingProperties set to true', () => {
    return checkValidValues(new CustomClass(), nonExisting, {
      skipMissingProperties: true,
    });
  });

  it('should fail if validator.validate said that its invalid with skipMissingProperties set to true', () => {
    return checkInvalidValues(new CustomClass(), existing, {
      skipMissingProperties: true,
    });
  });

  it('should return error object with proper data', () => {
    const validationType = 'isUnique';
    const message = 'The given customProp already exists.';

    return checkReturnedError(
      new CustomClass(),
      existing,
      validationType,
      message,
    );
  });
});
