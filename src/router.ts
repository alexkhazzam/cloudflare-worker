import { postQuery } from './controllers/query';
import { postWidgets } from './controllers/widgets';

export default async (request: Request): Promise<Response> => {
  const path = request.url.split('https://worker.alex722khazzam.workers.dev')[1];
  const method = request.method;

  if (path === '/query' && method === 'POST') {
    return await postQuery(request);
  } else if (path === '/widgets' && method === 'POST') {
    return await postWidgets(request);
  }
};
