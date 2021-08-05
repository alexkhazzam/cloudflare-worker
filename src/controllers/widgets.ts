import response from '../util/response';
import readRequestBody from '../util/readRequestBody';
import { EndpointRecord } from '../types/interfaces';
import { storeMultipleWidgetRecords } from '../KVHandlers/queries';

/**
 * @param {Request} request request made to cloudflare worker
 * @returns {Response} success status
 */
export const postWidgets = async (request: Request): Promise<Response> => {
  const requestBody = (await readRequestBody(request)) as EndpointRecord[];

  for (const record of requestBody) {
    for (const key in record) {
      Reflect.set(record, `${record.id}.${key}`, record[key]);
      Reflect.deleteProperty(record, key);
    }
  }

  await storeMultipleWidgetRecords(requestBody, WIDGETS);

  return response('results');
};
