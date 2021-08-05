import { FilterOption, Namespace, KV } from '../../types/interfaces';
import hashmap from './hashmap';

/**
 * @param {KV} kv key-value pair
 * @param {FilterOption} option an object that contain filters for retrieving data
 * @returns {boolean} true or false depending on whether a kv passed the filter requirements
 */
const fulfillsRequirements = (kv: KV, option: FilterOption): boolean => {
  const optionType = option.type;
  const optionField = option.field;
  const optionValue = option.value as string;

  const kvField = Object.keys(kv)[0].split('.')[1];
  const kvValue = kv[Object.keys(kv)[0]] as string;

  const equalFields: boolean = kvField === optionField;

  if (optionType === 'LIKE') {
    return equalFields && kvValue.includes(optionValue);
  } else {
    return true; // TODO '!=' '='
  }
};

/**
 * @param {Namespace} NAMESPACE name of data table that consists of KV pairs
 * @param {FilterOptions} options array of objects that contain filters for retrieving data
 * @returns {Response} an array of records that have a field that matches the filterOptions
 */
export default async (NAMESPACE: Namespace, options: FilterOption[]): Promise<KV[][]> => {
  let records: KV[][] = [];

  for (const option of options) {
    records = [
      ...records,
      ...(await hashmap(NAMESPACE)).filter(
        (record: KV[]): boolean =>
          record.filter((kv: KV): boolean => fulfillsRequirements(kv, option)).length > 0,
      ),
    ];
  }

  return records;
};
