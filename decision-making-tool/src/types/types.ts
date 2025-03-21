export interface DomElementAttribute {
  [key: string]: string;
}

export interface DomElementProperties {
  [key: string]: string;
}

export interface OptionData {
  id: string;
  title: string;
  weight: number;
}

export interface OptionItemValue {
  id?: string;
  title: string;
  weight: string;
}

export interface OptionListValue {
  lastId?: number;
  list: OptionItemValue[];
}

export enum StorageKeys {
  optionListValue = 'optionListValue',
}

export type TypeGuard<T> = (value: unknown) => value is T;
