import { ExtensionContext } from 'vscode';

export const setItem = (context: ExtensionContext, key: string, value: string | undefined) => {
  context.globalState.update(key, value);
};

export const getItem = (context: ExtensionContext, key: string) => {
  return context.globalState.get(key, '');
};
