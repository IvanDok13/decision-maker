import { createElementWithProperties } from '../../utils/utils';
import styles from './header.module.css';
import logoPath from '/svg/logo.svg';

export class Header {
  public element: HTMLElement;
  private gameName: string;

  constructor() {
    this.gameName = 'Decision Making Tool';
    this.element = createElementWithProperties('header', styles.header);

    this.createChildren();
  }

  public getComponent(): HTMLElement {
    return this.element;
  }

  private createChildren(): void {
    const headerWrapper = createElementWithProperties('div', styles.headerWrapper);

    const headerLogo = createElementWithProperties('div', styles.headerLogo);
    const img = createElementWithProperties('img', styles.headerImg, {
      alt: 'logo image',
      src: `${logoPath}`,
    });

    const title = createElementWithProperties('h1', styles.headerTitle, undefined, [{ innerText: `${this.gameName}` }]);

    headerLogo.append(img, title);
    headerWrapper.append(headerLogo);

    this.element.append(headerWrapper);
  }
}
