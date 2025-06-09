declare module '*.scss?inline';

export {}; // <== Aggiungi questo

declare global {
  type Constructor<T = {}> = new (...args: any[]) => T;
}
