export function setStorage(name: string, value: string): void {
  window.localStorage.setItem(name, JSON.stringify(value));
}

export function getStorage(name: string, substr: string): string {
  const varStorage: string | null = window.localStorage.getItem(name);
  return !varStorage ? substr : JSON.parse(varStorage);
}

export function getLocalStorage(key: string) {
  const words = localStorage.getItem(key);
  if (words) return JSON.parse(words);
  return {};
}
