import { createElementWithProperties } from '../../utils/utils';
import styles from './option.module.css';
import { OptionItemValue } from '../../types/types.ts';

export class Option implements OptionItemValue {
  public element: HTMLElement;
  public id: string;
  public title: string;
  public weight: string;

  constructor({
    id,
    title,
    weight,
    onOptionRemove,
    onTitleChange,
    onWeightChange,
  }: {
    id: string;
    title: string;
    weight: string;
    onOptionRemove: () => void;
    onTitleChange: (title: string) => void;
    onWeightChange: (weight: string) => void;
  }) {
    this.id = id;
    this.title = title;
    this.weight = weight;
    this.element = createElementWithProperties('li', styles.option);

    this.createChildren(onOptionRemove, onTitleChange, onWeightChange);
  }
  public getComponent(): HTMLElement {
    return this.element;
  }
  private createChildren(
    onOptionRemove: () => void,
    onTitleChange: (title: string) => void,
    onWeightChange: (weight: string) => void
  ): void {
    const label = createElementWithProperties('label', styles.optionLabel, { for: this.id }, [{ innerText: this.id }]);
    const title = createElementWithProperties(
      'input',
      styles.optionTitle,
      { id: this.id, type: 'text', name: 'title', placeholder: 'Title', value: this.title },
      [{ innerText: this.title }]
    );
    title.addEventListener('change', () => {
      onTitleChange(title.value)
    });

    const weight = createElementWithProperties(
      'input',
      styles.optionWeight,
      { type: 'number', name: 'weight', placeholder: 'Weight', value: this.weight },
      [{ innerText: this.weight }]
    );
    weight.addEventListener('change', () => {
      onWeightChange(weight.value)
    });

    const buttonDel = createElementWithProperties('button', styles.optionButtonDel, undefined, [
      { innerText: 'Delete' },
    ]);

    buttonDel.addEventListener('click', () => {
      onOptionRemove();
      this.element.remove();
    });

    this.element.append(label, title, weight, buttonDel);
  }
}
