export const createEl = (
  elementName: keyof HTMLElementTagNameMap,
  parent?: HTMLElement,
  classNames?: string[],
  attributes?: { [key: string]: string },
): HTMLElement => {
  const tag: HTMLElement = document.createElement(elementName);
  if (classNames) tag.classList.add(...classNames);
  if (attributes) {
    const k: string[] = Object.keys(attributes);
    k.forEach((key: string) => {
      tag.setAttribute(key, attributes[key]);
    });
  }
  if (parent) parent.append(tag);
  return tag;
};
