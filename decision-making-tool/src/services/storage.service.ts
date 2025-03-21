import type { OptionListValue, StorageKeys, TypeGuard } from '../types/types';

export class StorageService {
  private static instance = new StorageService();
  private readonly prefix: string;

  private constructor() {
    this.prefix = 'RSS_Decision_IvanDok';
  }

  public static getInstance(): StorageService {
    return StorageService.instance;
  }

  public saveOptions(key: StorageKeys, value: OptionListValue | boolean): void {
    const storageKey = this.prefix + key;
    globalThis.localStorage.setItem(storageKey, JSON.stringify(value));
  }

  public loadOptions<T>(key: StorageKeys, typeGuard: TypeGuard<T>): T | null {
    const storageKey = this.prefix + key;
    const value = globalThis.localStorage.getItem(storageKey);
    if (!value) {
      return null;
    }
    try {
      const parsedValue: unknown = JSON.parse(value);
      if (typeGuard(parsedValue)) {
        return parsedValue;
      }
      return null;
    } catch {
      return null;
    }
  }
}
