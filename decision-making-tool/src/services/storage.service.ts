import type { OptionListValue, StorageKeys } from '../types/types';

export class StorageService {
  private static instance = new StorageService();
  private readonly prefix: string;

  private constructor() {
    this.prefix = 'RSS_Decision_IvanDok';
  }

  public static getInstance(): StorageService {
    return StorageService.instance;
  }

  public saveOptions(key: StorageKeys, value: OptionListValue): void {
    const storageKey = this.prefix + key;
    globalThis.localStorage.setItem(storageKey, JSON.stringify(value));
  }

  public loadOptions(key: StorageKeys): OptionListValue | null {
    const storageKey = this.prefix + key;
    const value = globalThis.localStorage.getItem(storageKey);
    if (!value) {
      return null;
    }
    try {
      return JSON.parse(value);
    } catch {
      return null;
    }
  }
}
