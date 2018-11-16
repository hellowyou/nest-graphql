import { DateTimeColumn } from './datetime.column';

describe('dateTime column', () => {
  describe('type', () => {
    it('should not override', () => {
      const column = new DateTimeColumn({ name: 'date', type: 'varchar' });
      expect(column.type).toEqual('datetime');
    });
  });

  describe('length', () => {
    it('should default to 4', () => {
      const column = new DateTimeColumn();
      expect(column.length).toEqual('4');
    });
  });
});
