import { urlLink } from '../../Templates/serve';
import { StatisticsUserWords } from '../../Types/types';
import User from '../authorization/user';

export async function getStatisticWords(user: User): Promise<StatisticsUserWords> {
  const response = await fetch(`${urlLink}users/${user.userId}/statistics`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${user.token}`,
      Accept: 'application/json',
    },
  });
  if (response.status === 404) {
    console.log('Error');
  }
  const res: StatisticsUserWords = await response.json();
  return res;
}
