export default (data: unknown): Response => {
  return new Response(JSON.stringify(data));
};
