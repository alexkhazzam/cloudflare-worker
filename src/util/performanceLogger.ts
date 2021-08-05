export default (
  executeControllerCode: () => unknown,
  getElapsedTime: (elapsedTime: string) => unknown,
): void => {
  const start = new Date().getTime();

  executeControllerCode();

  const end = new Date().getTime();

  getElapsedTime(((end - start) / 1000).toPrecision(5));
};
