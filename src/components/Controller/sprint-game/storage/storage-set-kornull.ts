// import { Page } from './type-storage';

export function setLocalStorage(key: string, id: string | object) {
  localStorage.setItem(key, JSON.stringify(id));
}
export function getLocalStorage(key: string) {
  const words = localStorage.getItem(key);
  if (words) return JSON.parse(words);
  return {};
}

setLocalStorage('timeDateReset', '0:0:0');
// console.log( getLocalStorage('timeDateReset'))
// {userId: '63067cd7d479dd0016f9b58a', token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzM…jc0fQ.9htw7i1XiQwo93M4ljv7V4vCvcatfLjF3D5wiKm-94A', name: 'as'}
// name: "as"
// token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDY3Y2Q3ZDQ3OWRkMDAxNmY5YjU4YSIsImlhdCI6MTY2MTM2OTg3NCwiZXhwIjoxNjYxMzg0Mjc0fQ.9htw7i1XiQwo93M4ljv7V4vCvcatfLjF3D5wiKm-94A"
// userId: "63067cd7d479dd0016f9b58a"

// name: "as"
// token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDY3Y2Q3ZDQ3OWRkMDAxNmY5YjU4YSIsImlhdCI6MTY2MTM2OTg3NCwiZXhwIjoxNjYxMzg0Mjc0fQ.9htw7i1XiQwo93M4ljv7V4vCvcatfLjF3D5wiKm-94A"
// userId: "63067cd7d479dd0016f9b58a"
