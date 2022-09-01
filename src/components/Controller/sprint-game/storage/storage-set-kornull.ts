export function setLocalStorage(key: string, id: string | object) {
  localStorage.setItem(key, JSON.stringify(id));
}
export function getLocalStorage(key: string) {
  const words = localStorage.getItem(key);
  if (words) return JSON.parse(words);
  return {};
}

setLocalStorage('timeDateReset', `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`);
