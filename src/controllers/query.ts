import filter from '../KVHandlers/filters/filter';
import response from '../util/response';
import readRequestBody from '../util/readRequestBody';
import { QueryBody, KV, ResponsePayload } from '../types/interfaces';
import retrieveNamespace from '../KVHandlers/retrieveNamespace';
import { retrieveAllRecords } from '../KVHandlers/queries';
import performanceLogger from '../util/performanceLogger';

/**
 * @param {Request} request request made to cloudflare worker
 * @returns {Response} a collection of JSON data
 */
export const postQuery = (request: Request): Response => {
  let responseBody: KV[][] | KV[];
  const payload: ResponsePayload = {
    elapsedTime: '',
    body: [],
  };

  performanceLogger(
    async (): Promise<void> => {
      const requestBody = (await readRequestBody(request)) as QueryBody;
      const namespace = retrieveNamespace(requestBody.namespace);

      responseBody = requestBody['conditions']
        ? await filter(namespace, requestBody.conditions)
        : await retrieveAllRecords(namespace);
    },
    (elapsedTime): void => {
      payload.elapsedTime = `${elapsedTime} seconds`;
      payload.body = responseBody;
    },
  );

  return response(payload);
};
