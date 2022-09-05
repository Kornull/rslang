import User from '../../Controller/authorization/user';
import { getLocalStorage } from '../../Controller/storage';

export const COUNT_GROUP = 6;
export const COUNT_PAGE_GROUP = 30;
export const USER: User = getLocalStorage('userDataBasic');
