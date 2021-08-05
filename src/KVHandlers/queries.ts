import { Namespace, ListKeys, KV, EndpointRecord, StorageKV } from '../types/interfaces';

/**
 * @param {Namespace} NAMESPACE name of data table that consists of KV pairs
 * @returns {ListKeys} an object that contains an array of all KV pairs in NAMESPACE
 */
export const retrieveAllKeys = async (NAMESPACE: Namespace): Promise<ListKeys> =>
  await NAMESPACE.list();

/**
 * @param {string} key key of a key-value pair in a Namepsace
 * @param {string | number} value value of a key-value pair
 * @param {Namespace} NAMESPACE name of data table that consists of KV pairs
 * @returns {Promise<boolean>} the truthy result of storing or updating a KV pair in NAMESPACE
 */
export const storeSinglePlainRecord = async (
  key: string,
  value: string | number,
  NAMESPACE: Namespace,
): Promise<void> => await NAMESPACE.put(key, value as string);

/**
 * @param {Namespace} NAMESPACE name of data table that consists of KV pairs
 * @param {StroageKV[]} records collection of key-value pair objects
 */
export const storeMultiplePlainRecords = async (
  NAMESPACE: Namespace,
  records: StorageKV[],
): Promise<void> => {
  for (const record of records) {
    for (const { key, value } in record) {
      await storeSinglePlainRecord(key, value, NAMESPACE);
    }
  }
};

/**
 * @param {RequestFilterOptions[]} records array of data objects with key-value pairs
 * @param {Namespace} NAMESPACE name of data table that consists of KV pairs
 */
export const storeMultipleWidgetRecords = async (
  records: EndpointRecord[],
  NAMESPACE: Namespace,
): Promise<void> => {
  console.log(records);
  for (const record of records) {
    for (const key in record) {
      await storeSinglePlainRecord(key, record[key], NAMESPACE);
    }
  }
};

/**
 * @param {Namespace} NAMESPACE  name of data table that consists of KV pairs
 * @param {string} key key of a key-value pair in a Namespace
 * @returns {Promise<boolean>} true or false whether a KV pair was deleted
 */
export const deleteSingleRecord = async (NAMESPACE: Namespace, key: string): Promise<boolean> =>
  await NAMESPACE.delete(key);

/**
 * @param {Namespace} NAMESPACE name of data table that consists of KV pairs
 * @returns {Promise<KV[]>} collection of key-value pairs in a Namespace
 */
export const retrieveAllRecords = async (NAMESPACE: Namespace): Promise<KV[]> =>
  await Promise.all(
    (
      await retrieveAllKeys(NAMESPACE)
    ).keys.map(async ({ name }): Promise<KV> => {
      return { [name]: await getSingleValue(NAMESPACE, name as string) };
    }),
  );

/**
 * @param {Namespace} NAMESPACE name of data table that consists of KV pairs
 * @param {string} key key of a key-value pair
 * @returns {Promise<string>} the value of a key in a key-value pair
 */
export const getSingleValue = async (NAMESPACE: Namespace, key: string): Promise<string | number> =>
  await NAMESPACE.get(key);
