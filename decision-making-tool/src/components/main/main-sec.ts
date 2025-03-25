import { StorageService } from '../../services/storage.service';
import { StorageKeys } from '../../types/types';
import { createElementWithProperties } from '../../utils/utils';
import { Option } from '../option/option';
import styles from './main-sec.module.css';

export class MainSec {
  public element: HTMLElement;
  private serialNumber = 1;
  private listOption: HTMLUListElement;
  private options: Option[] = [];

  constructor() {
    this.element = createElementWithProperties('main', styles.main);
    this.createChildren();

    addEventListener('beforeunload', () => {
      this.saveOptionsToLocalStorage();
    });
  }

  public getComponent(): HTMLElement {
    return this.element;
  }

  private createChildren(): void {
    const mainWrapper = createElementWithProperties('div', styles.mainWrapper);

    const optSection = createElementWithProperties('section', styles.optSection);
    const buttonSection = createElementWithProperties('section', styles.buttonSection);

    this.listOption = createElementWithProperties('ul', styles.listOption);
    optSection.append(this.listOption);

    const prevOptions = StorageService.getInstance().loadOptions(StorageKeys.optionListValue)?.list ?? [];
    this.options = prevOptions.map(
      ({ id, title, weight }) =>
        new Option({
          id: id!,
          title,
          weight,
          onOptionRemove: () => this.onOptionRemove(id!),
          onTitleChange: (title: string) => this.onTitleChange(id!, title),
          onWeightChange: (weight: string) => this.onWeightChange(id!, weight),
        })
    );

    if (this.options.length > 0) {
      this.serialNumber = this.options.length + 1;
      this.options.forEach(option => {
        this.listOption.append(option.getComponent());
      });
    } else {
      // Create the first Option element by default
      const optionId = `#${this.serialNumber}`;
      const firstOption = new Option({
        id: optionId,
        title: '',
        weight: '',
        onOptionRemove: () => this.onOptionRemove(optionId),
        onTitleChange: (title: string) => this.onTitleChange(optionId, title),
        onWeightChange: (weight: string) => this.onWeightChange(optionId, weight),
      });
      this.listOption.append(firstOption.getComponent());
      this.options.push(firstOption);
      this.serialNumber++;
      this.saveOptionsToLocalStorage();
    }

    const createOptionButton = createElementWithProperties('button', styles.buttonCreate, undefined, [
      { innerText: 'Add Option' },
    ]);

    createOptionButton.addEventListener('click', () => {
      const newOptionId = `#${this.serialNumber}`;
      const newOption = new Option({
        id: newOptionId,
        title: '',
        weight: '',
        onOptionRemove: () => this.onOptionRemove(newOptionId),
        onTitleChange: (title: string) => this.onTitleChange(newOptionId, title),
        onWeightChange: (weight: string) => this.onWeightChange(newOptionId, weight),
      });
      this.listOption.append(newOption.getComponent());
      this.options.push(newOption);
      this.serialNumber++;
    });

    buttonSection.append(createOptionButton);
    mainWrapper.append(optSection, buttonSection);

    this.element.append(mainWrapper);
  }

  private saveOptionsToLocalStorage() {
    StorageService.getInstance().saveOptions(StorageKeys.optionListValue, {
      list: this.options.map(({ id, title, weight }) => ({ id, title, weight })),
    });
  }

  private onOptionRemove(optionId: string) {
    this.options = this.options.filter(option => option.id !== optionId);
  }

  private onTitleChange(optionId: string, title: string) {
    const currentOption = this.options.find((option) => option.id === optionId)
    if (currentOption) {
      currentOption.title = title;
    }
  }
  private onWeightChange(optionId: string, weight: string) {
    const currentOption = this.options.find((option) => option.id === optionId)
    if (currentOption) {
      currentOption.weight = weight;
    }
  }
}
