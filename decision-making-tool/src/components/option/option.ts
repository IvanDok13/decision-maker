import { createElementWithProperties } from '../../utils/utils';
import styles from './option.module.css';

export class Option {
  public element: HTMLElement;
  public id: string;

  constructor(id: string) {
    this.id = id;
    this.element = createElementWithProperties('li', styles.option);

    this.createChildren();
  }
  public getComponent(): HTMLElement {
    return this.element;
  }
  private createChildren(): void {
    const label = createElementWithProperties('label', styles.optionLabel, { for: this.id }, [{ innerText: this.id }]);
    const title = createElementWithProperties(
      'input',
      styles.optionTitle,
      { id: this.id, type: 'text', name: 'title', placeholder: 'Title' },
      [{ innerText: ' ' }]
    );
    const weight = createElementWithProperties(
      'input',
      styles.optionWeight,
      { type: 'number', name: 'weight', placeholder: 'Weight' },
      [{ innerText: ' ' }]
    );

    const buttonDel = createElementWithProperties('button', styles.optionButtonDel, undefined, [
      { innerText: 'Delete' },
    ]);

    buttonDel.addEventListener('click', () => {
      this.element.remove();
    });

    this.element.append(label, title, weight, buttonDel);
  }
}
