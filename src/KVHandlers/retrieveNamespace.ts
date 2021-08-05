import { Namespace } from '../types/interfaces';

export default (namespace: string): Namespace => {
  if (namespace === 'TEST_DATA') {
    return TEST_DATA as Namespace;
  } else if (namespace === 'WIDGETS') {
    return WIDGETS as Namespace;
  } else {
    return ARTICLES as Namespace;
  }
};
