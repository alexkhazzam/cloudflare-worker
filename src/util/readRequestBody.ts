export default async (request: Request): Promise<unknown> => {
  const headers = Object.fromEntries(request.headers);

  const contentType = headers['content-type'];

  if (contentType) {
    if (contentType === 'application/json') {
      return await request.json();
    } else if (contentType === 'text/html') {
      return await request.text();
    }
  }
};
