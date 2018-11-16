import { generateIndexName, generateUniqueConstraintName } from './helpers';

describe('helpers', () => {
  const tableName = 'table';
  const fields = ['field1', 'field2'];
  const generators = [
    {
      name: 'generateIndexName',
      postfix: 'IDX',
      fn: generateIndexName,
    },
    {
      name: 'generateUniqueConstraintName',
      postfix: 'UQ',
      fn: generateUniqueConstraintName,
    },
  ];

  generators.map(generator => {
    describe(generator.name, () => {
      const { fn, postfix } = generator;

      it('should return proper format', () => {
        const result = fn(tableName, fields[0]);

        expect(result).toEqual([tableName, fields[0], postfix].join('_'));
      });

      it('should concatenate multiple fields', () => {
        const result = fn(tableName, ...fields);
        const expected = [tableName]
          .concat(fields)
          .concat(postfix)
          .join('_');

        expect(result).toEqual(expected);
      });
    });
  });
});
