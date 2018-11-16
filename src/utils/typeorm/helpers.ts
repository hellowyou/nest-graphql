/**
 * Generates an index name based on the given table name and fields.
 *
 * @param tableName Table name
 * @param fields Array of field names.
 */
export function generateIndexName(tableName: string, ...fields: string[]) {
  return `${tableName}_${fields.join('_')}_IDX`;
}

/**
 * Generates a unique constaint name based on the given table name and fields.
 *
 * @param tableName Table name
 * @param fields Array of field names.
 */
export function generateUniqueConstraintName(
  tableName: string,
  ...fields: string[]
) {
  return `${tableName}_${fields.join('_')}_UQ`;
}
