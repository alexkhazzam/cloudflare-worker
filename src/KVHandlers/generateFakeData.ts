import { Namespace } from '../types/interfaces';
import { storeSingleRecord } from './queries';

/**
 * @param {number} fakeRecordCount number of fake records to be generated
 * @param {Namespace} NAMESPACE name of table that represents a Cloudflare KV storage
 */
export default async (fakeRecordCount: number, NAMESPACE: Namespace): Promise<void> => {
  const fields = ['types', 'names', 'jobs', 'states'];

  const types = ['human', 'cyborg', 'alien'];
  const names = ['Mike', 'Joe', 'Larry'];
  const jobs = ['programmer', 'electrician', 'plumber'];
  const states = ['California', 'Kansas', 'Nevada'];

  let i = 0;

  while (i <= fakeRecordCount) {
    const getRandomField = () => Math.floor(Math.random() * 3);

    const type = types[getRandomField()];
    const name = names[getRandomField()];
    const job = jobs[getRandomField()];
    const state = states[getRandomField()];

    const record = [type, name, job, state];

    for (let k = 0; k < record.length; k++) {
      const key = `${i}.${fields[k].slice(0, -1)}`;
      const value = record[k];

      await storeSingleRecord(key, value, NAMESPACE);
    }

    i++;
  }
};

/** Fake data example 
[
  { key: '0.type', value: 'cyborg' },
  { key: '0.name', value: 'Larry' },
  { key: '0.job', value: 'electrician' },
  { key: '0.state', value: 'Kansas' },
  { key: '1.type', value: 'human' },
  { key: '1.name', value: 'Larry' },
  { key: '1.job', value: 'electrician' },
  { key: '1.state', value: 'California' },
  { key: '2.type', value: 'alien' },
  { key: '2.name', value: 'Larry' },
  { key: '2.job', value: 'electrician' },
  { key: '2.state', value: 'Kansas' },
  { key: '3.type', value: 'cyborg' },
  { key: '3.name', value: 'Mike' },
  { key: '3.job', value: 'programmer' },
  { key: '3.state', value: 'California' },
  { key: '4.type', value: 'human' },
  { key: '4.name', value: 'Mike' },
  { key: '4.job', value: 'plumber' },
  { key: '4.state', value: 'Kansas' },
  { key: '5.type', value: 'cyborg' },
  { key: '5.name', value: 'Mike' },
  { key: '5.job', value: 'programmer' },
  { key: '5.state', value: 'California' }
]
**/
