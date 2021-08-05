import { Namespace, KV, ListKey } from '../../types/interfaces';
import { retrieveAllKeys, retrieveAllRecords } from '../queries';

/**
 * @param {object} obj KV object
 * @returns {string} the id of object key
 */
const retrieveId = (obj: KV): string => Object.keys(obj)[0].split('.')[0];

/**
 * @param {KV[]} KVPairs array of KV pairs
 * @param {Namespace} NAMESPACE name of table that represents a Cloudflare KV storage
 * @returns {KV[][]} an array of records that contains KV pairs with matching ids
 */
const groupKVPairsById = async (KVPairs: KV[], NAMESPACE: Namespace): Promise<KV[][]> => {
  const uniqueIdCount = await retrieveUniqueIds(NAMESPACE);
  const records: KV[][] = [];

  for (let k = 0; records.length < uniqueIdCount; k++) {
    const targetId = retrieveId(KVPairs[k]);

    if (!records.find((record: KV[]): boolean => record[0].id === targetId)) {
      records.push([
        ...[{ id: targetId }],
        ...KVPairs.filter((KV: KV): boolean => retrieveId(KV) === targetId),
      ]);
    }
  }

  return records;
};

/**
 * @param {Namespace} NAMESPACE name of table that represents a Cloudflare KV storage
 * @returns {number} the number of unique ids that a collection of KV pairs share
 */
const retrieveUniqueIds = async (NAMESPACE: Namespace): Promise<number> => {
  const keys: ListKey[] = (await retrieveAllKeys(NAMESPACE)).keys;
  const uniqueIds = new Set(); // Similar to an array, though no two elements can share the same value

  keys.forEach(({ name }): void => {
    uniqueIds.add((name as string).split('.')[0]);
  });

  return uniqueIds.size;
};

export default async (NAMESPACE: Namespace): Promise<KV[][]> =>
  await groupKVPairsById(await retrieveAllRecords(NAMESPACE), NAMESPACE);
