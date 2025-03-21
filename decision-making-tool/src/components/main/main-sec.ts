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

    if (this.options.length > 0) {
      this.serialNumber = this.options.length + 1;
      this.options.forEach(option => {
        this.listOption.append(option.getComponent());
      });
    } else {
      // Create the first Option element by default
      const firstOption = new Option(`#${this.serialNumber}`);
      this.listOption.append(firstOption.getComponent());
      this.options.push(firstOption);
      this.serialNumber++;
      StorageService.getInstance().saveOptions(StorageKeys.optionListValue, this.options);
    }

    const createOptionButton = createElementWithProperties('button', styles.buttonCreate, undefined, [
      { innerText: 'Add Option' },
    ]);

    createOptionButton.addEventListener('click', () => {
      const newOption = new Option(`#${this.serialNumber}`);
      this.listOption.append(newOption.getComponent());
      this.options.push(newOption);
      this.serialNumber++;
      // StorageService.saveOptions(this.options);
    });

    buttonSection.append(createOptionButton);
    mainWrapper.append(optSection, buttonSection);

    this.element.append(mainWrapper);
  }
}
