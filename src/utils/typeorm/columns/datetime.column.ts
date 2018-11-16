import { TableColumn } from 'typeorm';
import { TableColumnOptions } from 'typeorm/schema-builder/options/TableColumnOptions';

export class DateTimeColumn extends TableColumn {
  constructor(options?: TableColumnOptions) {
    const defaults = {
      length: '4',
    };

    super(Object.assign({}, defaults, options));
  }

  set type(val) {
    /* Cannot change type */
  }

  get type() {
    return 'datetime';
  }
}
