import { TableColumn } from 'typeorm';
import { TableColumnOptions } from 'typeorm/schema-builder/options/TableColumnOptions';

// TODO: Move this to a separate global definition file.
export interface ITableCustomColumnOptions
  extends Pick<TableColumnOptions, Exclude<keyof TableColumnOptions, 'type'>> {
  type?: string;
}

export class DateTimeColumn extends TableColumn {
  constructor(options?: ITableCustomColumnOptions) {
    const defaults = {
      length: '4',
    };

    super(Object.assign({}, defaults, options) as TableColumnOptions);
  }

  set type(val) {
    /* Cannot change type */
  }

  get type() {
    return 'datetime';
  }
}
